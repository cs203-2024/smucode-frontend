"use client";

import { useEffect, useState } from 'react';
import { TournamentProps, RoundProps, PlayerInfo } from './types';
import { Button } from './ui/button';
import { Edit, LoaderCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { DialogFooter, DialogHeader } from './ui/dialog';
import { Input } from './ui/input';
import { updateBracketScore, endBracket } from './mockApi';
import { toast } from "sonner";

interface BracketProps {
  roundid: number;
  id: number;
  status: string;
  playerOne: PlayerInfo | undefined;
  playerTwo: PlayerInfo | undefined;
}

const PlayerCard: React.FC<{ player: PlayerInfo | undefined; isWinner: boolean; status: string }> = ({ player, isWinner, status }) => {
  if (!player) return <div className="flex items-center justify-between bg-transparent p-1.5 h-10 border-gray-400 rounded-full"></div>;
  return (
    <div className={`${!isWinner && status === "completed" ? "opacity-40" : ""} flex items-center py-1 justify-between text-sm`}>
      <div className="flex items-center space-x-2">
        <div className={`${isWinner ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"} w-8 h-8 rounded-full flex items-center justify-center`}>
          {player.image ? (
            <img src={player.image} alt={player.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-sm">{player.name.charAt(0)}</span>
          )}
        </div>
        <p className={`${status !== "completed" ? "font-medium text-black-500" : ""} font-medium`}>{player.name}</p>
      </div>
      <div className={`${status !== "completed" ? "font-medium text-black-500" : ""} ${isWinner ? "logo_gradient text-white" : ""} w-8 h-8 rounded-full flex items-center justify-center`}>
        <span className="font-semibold">{player.score}</span>
      </div>
    </div>
  );
};

const EditPlayerCard: React.FC<{ player: PlayerInfo | undefined; onChange: (score: number) => void }> = ({ player, onChange }) => {
  if (!player) return null;

  return (
    <div className="flex items-center py-1 justify-between text-sm">
      <div className="flex items-center space-x-2">
        <div className="bg-gray-300 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center">
          {player.image ? (
            <img src={player.image} alt={player.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-sm">{player.name.charAt(0)}</span>
          )}
        </div>
        <p className="font-medium">{player.name}</p>
      </div>
      <Input
        type="number"
        value={player.score}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-16 text-center"
      />
    </div>
  );
};

const TournamentBracket: React.FC<BracketProps> = ({ roundid, id, status, playerOne, playerTwo }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [editedPlayerOne, setEditedPlayerOne] = useState(playerOne);
  const [editedPlayerTwo, setEditedPlayerTwo] = useState(playerTwo);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEnding, setIsEnding] = useState(false);
  const [isEditable, setIsEditable] = useState(status === "ongoing");
  const [bracketStatus, setBracketStatus] = useState(status);
  const getWinner = (playerOne: PlayerInfo | undefined, playerTwo: PlayerInfo | undefined) => {
    if (playerOne && playerTwo && bracketStatus === "completed") {
      if (playerOne.score === 0 && playerTwo.score === 0) return "";
      console.log(playerOne.score > playerTwo.score ? playerOne.name : playerTwo.name);
      return playerOne.score > playerTwo.score ? playerOne.name : playerTwo.name;
    }
    return undefined;
  };
  
  const [isWinner, setIsWinner] = useState(getWinner(playerOne, playerTwo)); 
  
  useEffect(() => {
    if (bracketStatus === "completed") {
      setIsWinner(getWinner(playerOne, playerTwo));
    }
  }, [bracketStatus]);

  const handleUpdate = () => {
    if (editedPlayerOne && editedPlayerTwo && !isUpdating) {
      setIsUpdating(true);
      updateBracketScore(roundid, id, editedPlayerOne.score, editedPlayerTwo.score)
        .then(() => {
          toast.success("Bracket score updated successfully!");
          setIsUpdating(false);
          setIsDialogOpen(false);
        })
        .catch((error) => {
          console.error("Failed to update bracket:", error);
          toast.error("Failed to update bracket. Please try again.");
          setIsUpdating(false);
        });
    } else {
      setIsDialogOpen(false);
    }
  };

  const handleEnd = () => {
    if (!isEnding) {
      setIsEnding(true);
      endBracket(roundid, id)
        .then(() => {
          setIsEnding(false);
          toast.success("Bracket ended!");
          setBracketStatus("completed");
          setIsEditable(false);
          setIsDialogOpen(false);
          setIsConfirmDialogOpen(false);
        })
        .catch((error) => {
          console.error("Failed to end bracket:", error);
          toast.error("Failed to end bracket. Please try again.");
          setIsEnding(false);
        });
    }
  };

  return (
    <>
    <Dialog open={isDialogOpen} onOpenChange={(isOpen) => {isEditable && setIsDialogOpen(isOpen)}}>
      <DialogTrigger asChild>
        <div 
          className="relative group py-2 px-1 cursor-pointer"
          onMouseEnter={() => isEditable && setIsHovered(true)}
          onMouseLeave={() => isEditable && setIsHovered(false)}
        >
          <div className={`space-y-1 ${isHovered ? 'blur-sm' : ''} transition-all duration-300`}>
            <PlayerCard player={playerOne} isWinner={isWinner === playerOne?.name} status={bracketStatus} />
            <PlayerCard player={playerTwo} isWinner={isWinner === playerTwo?.name} status={bracketStatus} />
          </div>
          {isHovered && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Edit className="w-6 h-6 text-gray-600" />
            </div>
          )}
        </div>
      </DialogTrigger>
      <DialogOverlay className="fixed inset-0 flex items-center justify-center bg-black z-50 bg-opacity-50">
        <DialogContent className="w-[280px] bg-white p-6 rounded-md shadow-md">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center font-medium text-center">
                Edit Bracket
                <Button
                  variant="ghost"
                  className="px-2 py-1 text-red-600 font-normal border-transparent hover:border-red-600 border-2 hover:bg-transparent rounded-md transition-all ml-2 hover:text-red-600"
                  onClick={() => setIsConfirmDialogOpen(true)}
                >
                  End
              </Button>
              </DialogTitle>
            </DialogHeader>
          <div className="space-y-2 py-4">
            <EditPlayerCard player={editedPlayerOne} onChange={(score) => setEditedPlayerOne(prev => prev ? {...prev, score} : undefined)} />
            <EditPlayerCard player={editedPlayerTwo} onChange={(score) => setEditedPlayerTwo(prev => prev ? {...prev, score} : undefined)} />
          </div>
          <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button className="w-[100px]" onClick={handleUpdate}>
                {isUpdating?(<LoaderCircle className="animate-spin" color="#FFF"/>):("Update")}
              </Button>
          </DialogFooter>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
     <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
     <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
       <DialogContent className="bg-white p-6 rounded-md shadow-md">
         <DialogTitle className="font-medium text-sm">Confirm End Bracket</DialogTitle>
         <p className="text-sm">Bracket scores will be finalized</p>
         <div className="flex justify-end space-x-2 mt-4">
           <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>Cancel</Button>
           <Button className="w-[150px]" onClick={handleEnd}>
                {isEnding?(<LoaderCircle className="animate-spin" color="#FFF"/>):("Yes, end bracket")}
            </Button>
         </div>
       </DialogContent>
     </DialogOverlay>
   </Dialog>
   </>
  );
};

const TournamentRound: React.FC<RoundProps & { searchQuery: string }> = ({ name, id, brackets, searchQuery }) => {
  const filteredBrackets = brackets.filter(
    (bracket) =>
      bracket.playerOne?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bracket.playerTwo?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredBrackets.length === 0) {
    return <div className="text-center text-gray-600"><p>No results found.</p></div>;
  }

  return (
    <div className="p-6 h-full w-full">
      <h2 className="font-bold mb-4 text-xl">{name}</h2>
      <p className="text-gray-700 mb-4">Round ID: {id}</p>
      <div className="overflow-x-auto mr-[100px]">
        <div className="inline-grid grid-cols-4 gap-x-5 gap-y-8 pb-4 min-w-[1050px] mr-[130px]">
          {filteredBrackets.map((bracket) => (
            <div key={bracket.id} className="w-[250px] bg-white shadow-sm p-4 rounded-lg">
              <TournamentBracket roundid={id} id={bracket.id} status={bracket.status} playerOne={bracket.playerOne} playerTwo={bracket.playerTwo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TournamentBracketCard = ({ rounds }: TournamentProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRounds = rounds.filter((round) => {
    return round.brackets.some(
      (bracket) =>
        bracket.playerOne?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bracket.playerTwo?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }).reverse();

  return (
    <div className="flex flex-col bg-slate-50 h-[85vh] space-y-8 overflow-y-auto p-1">
    <div className="mb-3">
      <input
        type="text"
        placeholder="Search participant..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-3 py-1.5 w-[250px] ml-5 border text-sm border-gray-400 rounded-lg"
      />
    </div>

    {filteredRounds.length === 0 ? (
      <div className="ml-8 mt-1 pb-[80vh] text-sm text-gray-600">
        <p>No results found.</p>
      </div>
    ) : (
      <div className="overflow-y-auto h-[80vh] w-full">
        {filteredRounds.map((round) => (
          <div key={round.id} className="flex-shrink-0">
            <TournamentRound
              name={round.name}
              id={round.id}
              brackets={round.brackets}
              searchQuery={searchQuery}
            />
          </div>
        ))}
      </div>
       )}
    </div>
  )

};


const TournamentBracketCards = ({ rounds }: TournamentProps) => {
  
  return (
    <TournamentBracketCard rounds={rounds} />
  );
};

export default TournamentBracketCards;
