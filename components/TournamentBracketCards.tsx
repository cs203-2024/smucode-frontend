"use client";

import { useEffect, useState } from 'react';
import { TournamentProps, RoundProps, PlayerInfo, BracketProps } from './types';
import { Button } from './ui/button';
import { Edit, LoaderCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { DialogFooter, DialogHeader } from './ui/dialog';
import { Input } from './ui/input';
import { updateBracketScore, endBracket, endRound } from '@/services/tournamentAPI';
import { toast } from "sonner";
import { useTournamentContext } from '@/context/TournamentContext';
import { useUserContext } from '@/context/UserContext';
import { getFormattedDateFromString } from '@/lib/utils';

const PlayerCard: React.FC<{ player: PlayerInfo | undefined; isWinner: boolean; status: string }> = ({ player, isWinner, status }) => {
  if (!player) return <div className="flex items-center justify-between bg-transparent p-1.5 h-10 border-gray-400 rounded-full"></div>;
  return (
    <div className={`${!isWinner && status === "completed" ? "opacity-40" : ""} flex items-center py-1 justify-between text-sm`}>
      <div className="flex items-center space-x-2">
        <div className={`${isWinner ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"} w-8 h-8 rounded-full flex items-center justify-center`}>
          {player.image ? (
            <img src={player.image} alt={player.id} className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-sm">{player.id.charAt(0)}</span>
          )}
        </div>
        <p className={`${status !== "completed" ? "font-medium text-black-500" : ""} font-medium`}>{player.id}</p>
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
            <img src={player.image} alt={player.id} className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-sm">{player.id.charAt(0)}</span>
          )}
        </div>
        <p className="font-medium">{player.id}</p>
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

const TournamentBracket: React.FC<BracketProps> = ({ id, status, playerOne, playerTwo }) => {
  const tournamentContext = useTournamentContext();
  const { user } = useUserContext();
  const tournamentOrganizerId = tournamentContext.organizerId;
  const [isHovered, setIsHovered] = useState(false);
  const [editedPlayerOne, setEditedPlayerOne] = useState(playerOne);
  const [editedPlayerTwo, setEditedPlayerTwo] = useState(playerTwo);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEnding, setIsEnding] = useState(false);
  const [isEditable, setIsEditable] = useState(status === "ongoing" && tournamentOrganizerId === user?.username);
  const [bracketStatus, setBracketStatus] = useState(status);
  const getWinner = (playerOne: PlayerInfo | undefined, playerTwo: PlayerInfo | undefined) => {
    if (playerOne && playerTwo && bracketStatus === "completed") {
      if (playerOne.score === 0 && playerTwo.score === 0) return "";
      return playerOne.score > playerTwo.score ? playerOne.id : playerTwo.id;
    }
    return undefined;
  };
  
  const [isWinner, setIsWinner] = useState(getWinner(playerOne, playerTwo)); 
  
  useEffect(() => {
    if (bracketStatus === "completed") {
      setIsWinner(getWinner(playerOne, playerTwo));
    }
  }, [bracketStatus]);

  const handleUpdate = async () => {
    if (editedPlayerOne && editedPlayerTwo && !isUpdating) {
      setIsUpdating(true);
      try {
        await updateBracketScore(id, editedPlayerOne, editedPlayerTwo);
        toast.success("Bracket score updated successfully!");
        setIsDialogOpen(false);
      } catch (error) {
        console.error("Failed to update bracket:", error);
        toast.error("Failed to update bracket. Please try again.");
      } finally {
        setIsUpdating(false);
      }
    } else {
      setIsDialogOpen(false);
    }
  };
  
  const handleEnd = async () => {
    if (playerOne && playerTwo && !isEnding) {
      setIsEnding(true);
      try {
        await endBracket(id, getWinner(playerOne, playerTwo));
        toast.success("Bracket ended!");
        setBracketStatus("completed");
        setIsEditable(false);
        setIsDialogOpen(false);
        setIsConfirmDialogOpen(false);
      } catch (error) {
        console.error("Failed to end bracket:", error);
        toast.error("Failed to end bracket. Please try again.");
      } finally {
        setIsEnding(false);
      }
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
          <div className={`space-y-1 ${isHovered ? 'blur-sm' : ''} transition-all duration-200`}>
            <PlayerCard player={playerOne} isWinner={isWinner === playerOne?.id} status={bracketStatus} />
            <PlayerCard player={playerTwo} isWinner={isWinner === playerTwo?.id} status={bracketStatus} />
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

const TournamentRound: React.FC<RoundProps & { searchQuery: string }> = ({ name, id, status, startDate, endDate, brackets, searchQuery }) => {
  const tournamentContext = useTournamentContext();
  const { user } = useUserContext();
  const tournamentOrganizerId = tournamentContext.organizerId;
  const tournamentId = tournamentContext.tournamentId;
  const [isEditable, setIsEditable] = useState(status === "ongoing" && tournamentOrganizerId === user?.username);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEndingRound, setIsEndingRound] = useState(false);
  const [roundStatus, setRoundStatus] = useState(status);
  const filteredBrackets = brackets.filter(
    (bracket) =>
      bracket.playerOne?.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bracket.playerTwo?.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEndRound = async () => {
    const allBracketsCompleted = brackets.every((bracket) => bracket.status === "completed");

    if (!allBracketsCompleted) {
      toast.error("All brackets must be completed before ending the round.");
      return; 
    }

    if (!isEndingRound) {
      setIsEndingRound(true);
      try {
        await endRound(tournamentId);
        toast.success("Round ended!");
        setRoundStatus("completed");
        setIsEditable(false);
        setIsDialogOpen(false);
      } catch (error) {
        console.error("Failed to end round:", error);
        toast.error("Failed to end round. Please try again.");
      } finally {
        setIsEndingRound(false);
      }
    }
  };  

  if (filteredBrackets.length === 0) {
    return (
      <div className="text-center text-gray-600">
        <p>No results found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 h-full w-full">
      <div className="flex items-center mb-4">
        <h2 className="font-bold text-xl">{name}</h2>

        {isEditable && (
          <Button
            variant="outline"
            className="ml-5 text-sm"
            onClick={() => setIsDialogOpen(true)} // Open the dialog on click
          >
            End Round
          </Button>
        )}
      </div>
      <p className="text-sm text-gray-700">Start Date: {startDate ? getFormattedDateFromString(startDate) : "TBD"}</p>
      <p className="text-sm text-gray-700 mb-4">End Date: {endDate ? getFormattedDateFromString(endDate) : "TBD"}</p>
      <div className="overflow-x-auto mr-[100px]">
        <div className="inline-grid grid-cols-4 gap-x-5 gap-y-8 pb-4 min-w-[1050px] mr-[130px]">
          {filteredBrackets.map((bracket) => (
            <div key={bracket.id} className="w-[250px] bg-white shadow-sm p-4 rounded-lg">
              <TournamentBracket
                key={bracket.id}
                id={bracket.id}
                seqId={bracket.seqId}
                status={bracket.status}
                playerOne={bracket.playerOne}
                playerTwo={bracket.playerTwo}
              />
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <DialogContent className="bg-white p-6 rounded-md shadow-md">
         <DialogTitle className="font-medium text-sm">Confirm End Round</DialogTitle>
         <p className="text-sm">Are you sure you want to end this round?</p>
         <div className="flex justify-end space-x-2 mt-4">
           <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
           <Button className="w-[150px]" onClick={handleEndRound}>
                {isEndingRound?(<LoaderCircle className="animate-spin" color="#FFF"/>):("Yes, end round")}
            </Button>
         </div>
       </DialogContent>
       </DialogOverlay>
      </Dialog>
    </div>
  );
};

const TournamentBracketCard = ({ rounds }: TournamentProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRounds = rounds.filter((round) => {
    return round.brackets.some(
      (bracket) =>
        bracket.playerOne?.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bracket.playerTwo?.id.toLowerCase().includes(searchQuery.toLowerCase())
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

    {filteredRounds.length === 0 && searchQuery ? (
      <div className="ml-8 mt-1 pb-[80vh] text-sm text-gray-600">
        <p>No results found.</p>
      </div>
    ) : (
      <div className="overflow-y-auto h-[80vh] w-full">
        {filteredRounds.map((round) => (
          <div key={round.id} className="flex-shrink-0">
            <TournamentRound 
              key={round.id}
              id={round.id} 
              seqId={round.seqId}
              name={round.name} 
              startDate={round.startDate}
              endDate={round.endDate}
              status={round.status}
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
