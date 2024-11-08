"use client";

import { useEffect, useState } from 'react';
import { TournamentProps, RoundProps, PlayerInfo, BracketProps } from '../types';
import { Button } from '../ui/button';
import { Edit, LoaderCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { DialogFooter, DialogHeader } from '../ui/dialog';
import { Input } from '../ui/input';
import { updateBracketScore, endBracket, endRound, updateRoundDetails } from '@/services/tournamentAPI';
import { toast } from "sonner";
import { useTournamentContext } from '@/context/TournamentContext';
import { useUserContext } from '@/context/UserContext';
import { formatDateToShortTime,getFormattedDateFromString } from '@/lib/utils';
import { DateTimePicker } from '@/components/DateTimePicker'
import { useCallback } from 'react';
import Image from 'next/image';

type BracketStatusUpdate = Pick<BracketProps, 'id' | 'status'>;

interface TournamentBracketProps extends BracketProps {
  updateBracketStatus: (update: BracketStatusUpdate) => void;
}


const PlayerCard: React.FC<{ player: PlayerInfo | undefined; isWinner: boolean; status: string }> = ({ player, isWinner, status }) => {

  const { showPrediction }= useTournamentContext();

  if (!player || !player.username) return <div className="flex items-center justify-between bg-transparent p-1.5 h-10 border-gray-400 rounded-full"></div>;

  return (
    <div className={`${!isWinner && status === "COMPLETED" ? "opacity-40" : ""} flex items-center py-1 justify-between text-sm`}>
      <div className="flex items-center space-x-2">
        <div className={`${isWinner ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"} w-8 h-8 rounded-full flex items-center justify-center`}>
          {player.image ? (
            <Image
             src={player.image}
             layout="fill"
             objectFit="cover"
             alt={player.username}
            />
          ) : (
            <span className="text-sm">{player.username.charAt(0)}</span>
          )}
        </div>
        <p className={`${status !== "COMPLETED" ? "font-medium text-black-500" : ""} font-medium`}>{player.username}</p>
        { showPrediction && player.winProbability && 
          <span className={`pl-1 ${player.winProbability >= 0.5 ? "text-green-500" : "text-orange-500"}`}>{Math.round(player.winProbability*100)}%</span>
        }
      </div>
      <div className={`${status !== "COMPLETED" ? "font-medium text-black-500" : ""} ${isWinner ? "logo_gradient text-white" : ""} w-8 h-8 rounded-full flex items-center justify-center`}>
        <span className="font-semibold">{player.score}</span>
      </div>
    </div>
  );
};

const EditPlayerCard: React.FC<{ player: PlayerInfo | undefined; onChange: (score: number) => void }> = ({ player, onChange }) => {
  if (!player || !player.username) return null;

  return (
    <div className="flex items-center py-1 justify-between text-sm">
      <div className="flex items-center space-x-2">
        <div className="bg-gray-300 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center">
          {player.image ? (
            <Image
              src={player.image}
              layout="fill"
              objectFit="cover"
              alt={player.username}
            />
          ) : (
            <span className="text-sm">{player.username.charAt(0)}</span>
          )}
        </div>
        <p className="font-medium">{player.username}</p>
      </div>
      <Input
        type="number"
        value={player.score}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-16 text-center"
        min="0"
      />
    </div>
  );
};

const TournamentBracket: React.FC<TournamentBracketProps> = ({ id, status, player1, player2, winner, updateBracketStatus }) => {
  const tournamentContext = useTournamentContext();
  const { user } = useUserContext();
  const tournamentOrganiserId = tournamentContext.organiserId;
  const [isHovered, setIsHovered] = useState(false);
  const [editedplayer1, setEditedplayer1] = useState(player1);
  const [editedplayer2, setEditedplayer2] = useState(player2);
  const [playerOne, setPlayerOne] = useState(player1);
  const [playerTwo, setPlayerTwo] = useState(player2);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEnding, setIsEnding] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [bracketStatus, setBracketStatus] = useState(status);

  const getWinner = useCallback(
    (playerOne: PlayerInfo | undefined, playerTwo: PlayerInfo | undefined) => {
      if (winner) {
        return winner;
      }
      if (playerOne && playerTwo && playerOne.username && playerTwo.username && bracketStatus === "COMPLETED") {
        if (playerOne.score === 0 && playerTwo.score === 0) return "";
        return playerOne.score > playerTwo.score ? playerOne.username : playerTwo.username;
      }
      return undefined;
    },
    [winner, bracketStatus]
  );
  
  const [isWinner, setIsWinner] = useState(getWinner(playerOne, playerTwo)); 

  useEffect(() => {
    if (bracketStatus === "COMPLETED") {
      setIsWinner(getWinner(playerOne, playerTwo));
    }
  }, [bracketStatus, playerOne, playerTwo, getWinner]);

  useEffect(() => {
    if(user){
      setIsEditable(status === "ONGOING" && tournamentOrganiserId === user?.username);
    }
  }, [user,status,tournamentOrganiserId]);


  const handleUpdate = async () => {
    if (editedplayer1 && editedplayer2 && !isUpdating) {
      setIsUpdating(true);
      try {
        await updateBracketScore(id, editedplayer1, editedplayer2);
        toast.success("Bracket score updated successfully!");
        setPlayerOne(editedplayer1);
        setPlayerTwo(editedplayer2);
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
        await endBracket(id);
        toast.success("Bracket ended!");
        setBracketStatus("COMPLETED");
        setIsEditable(false);
        setIsDialogOpen(false);
        setIsConfirmDialogOpen(false);
        updateBracketStatus({ id, status: "COMPLETED" });
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
          className={`relative group py-2 px-1 ${isEditable ? 'cursor-pointer' : ''}`}
          onMouseEnter={() => isEditable && setIsHovered(true)}
          onMouseLeave={() => isEditable && setIsHovered(false)}
        >
          <div className={`space-y-1 ${isHovered ? 'blur-sm' : ''} transition-all duration-200`}>
            <PlayerCard player={playerOne} isWinner={isWinner === playerOne?.username} status={bracketStatus} />
            <PlayerCard player={playerTwo} isWinner={isWinner === playerTwo?.username} status={bracketStatus} />
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
            <EditPlayerCard player={editedplayer1} onChange={(score) => setEditedplayer1(prev => prev ? {...prev, score} : undefined)} />
            <EditPlayerCard player={editedplayer2} onChange={(score) => setEditedplayer2(prev => prev ? {...prev, score} : undefined)} />
          </div>
          <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button className="w-[100px]" onClick={handleUpdate} disabled={isUpdating}>
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
           <Button className="w-[150px]" onClick={handleEnd} disabled={isEnding}>
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
  const tournamentOrganiserId = tournamentContext.organiserId;
  const [isEndDialogOpen, setIsEndDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isEndingRound, setIsEndingRound] = useState(false);
  const [roundName, setRoundName] = useState(name);
  const [roundStatus, setRoundStatus] = useState(status);
  const [isEditable, setIsEditable] = useState(false);
  const [isEditingRound, setIsEditingRound] = useState(false);
  const [localStartDateTime, setLocalStartDateTime] = useState<string>(startDate);
  const [localEndDateTime, setLocalEndDateTime] = useState<string>(endDate)
  const [startDateTime, setStartDate] = useState<Date | undefined>(startDate ? new Date(startDate) : undefined);
  const [endDateTime, setEndDate] = useState<Date | undefined>(endDate ? new Date(endDate) : undefined);
  const [startTime, setStartTime] = useState<string>(startDate ? formatDateToShortTime(new Date(startDate)) : "09:00");
  const [endTime, setEndTime] = useState<string>(endDate ? formatDateToShortTime(new Date(endDate)) : "18:00");
  const [dateError, setDateError ] = useState<string>("");
  const [updateStartDate, setUpdateStartDate] = useState<Date | undefined>(undefined);
  const [updateEndDate, setUpdateEndDate] = useState<Date | undefined>(undefined);
  const [updateRoundName, setUpdateRoundName] = useState(name);
  const [latestBrackets, setLatestBrackets] = useState(brackets);

  const updateBracketStatus = ({ id, status }: BracketStatusUpdate) => {
    setLatestBrackets((prevBrackets) =>
      prevBrackets.map((bracket) =>
        bracket.id === id ? { ...bracket, status } : bracket
      )
    );
  };

  // Date Time Logic
  const handleStartDateChange = (newDate: Date | undefined) => {
    setStartDate(newDate);
  };

  const handleStartTimeChange = (newTime: string) => {
    setStartTime(newTime);
  };

  const handleEndDateChange = (newDate: Date | undefined) => {
    setEndDate(newDate);
  };

  const handleEndTimeChange = (newTime: string) => {
    setEndTime(newTime);
  };

  // Check if end date/time is before start date/time
  useEffect(() => {
    if (startDateTime && endDateTime) {
      const [startHours, startMinutes] = startTime.split(':').map(Number);
      const [endHours, endMinutes] = endTime.split(':').map(Number);

      const startDate = new Date(startDateTime);
      startDate.setHours(startHours, startMinutes);

      const endDate = new Date(endDateTime);
      endDate.setHours(endHours, endMinutes);
      
      if (endDate <= startDate) {
        setDateError("End date/time is before start date/time.");
        setUpdateStartDate(undefined);
        setUpdateEndDate(undefined);
      } else {
        setDateError("");
        setUpdateStartDate(startDate);
        setUpdateEndDate(endDate);
      }
    }
  }, [startDateTime, endDateTime, startTime, endTime]);

  // Admin editable logic
  useEffect(() => {
    if(user){
      setIsEditable(roundStatus === "ONGOING" && tournamentOrganiserId === user?.username);
    }
  }, [user,roundStatus,tournamentOrganiserId]);

   // Handle actions
  const handleEndRound = async () => {
    const allBracketsCompleted = latestBrackets.every((bracket) => bracket.status === "COMPLETED");

    if (!allBracketsCompleted) {
      toast.error("All brackets must be completed before ending the round.");
      return; 
    }

    if (!isEndingRound) {
      setIsEndingRound(true);
      try {
        await endRound(id);
        toast.success("Round ended!");
        setRoundStatus("COMPLETED");
        setIsEditable(false);
        setIsEndDialogOpen(false);
      } catch (error) {
        console.error("Failed to end round:", error);
        toast.error("Failed to end round. Please try again.");
      } finally {
        setIsEndingRound(false);
      }
    }
  };  
 
  const handleEditRound = async () => {

    if (!isEditingRound && updateStartDate && updateEndDate) {
      setIsEditingRound(true);
      try {
        // Convert to SG time
        const sgStartDateTime = new Date(updateStartDate);
        sgStartDateTime.setTime(sgStartDateTime.getTime() + 8 * 60 * 60 * 1000);
        const sgEndDateTime = new Date(updateEndDate);
        sgEndDateTime.setTime(sgEndDateTime.getTime() + 8 * 60 * 60 * 1000);
        await updateRoundDetails(id, updateRoundName, sgStartDateTime, sgEndDateTime);
        toast.success("Successfully updated round details");
        setLocalStartDateTime(updateStartDate.toLocaleString("en-GB", {dateStyle: "short",timeStyle: "short"}));
        setLocalEndDateTime(updateEndDate.toLocaleString("en-GB", {dateStyle: "short",timeStyle: "short"}));
        setRoundName(updateRoundName);
        setIsEditDialogOpen(false);
      } catch (error) {
        console.error("Failed to update round details:", error);
        toast.error("Failed to update round details. Please try again.");
      } finally {
        setIsEditingRound(false);
      }
    }
  };  

  const filteredBrackets = brackets.filter(
    (bracket) =>
      bracket.player1 && bracket.player1?.username && bracket.player1?.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bracket.player2 && bracket.player2?.username && bracket.player2?.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        { !isEditDialogOpen &&
           <h2 className="font-bold text-xl">{roundName}</h2>
        }
       
        {isEditable && (
          <>
            { !isEditDialogOpen &&
            <>
              <Button
              variant="ghost"
              className="ml-2 p-0 text-sm w-[40px]"
              onClick={() => setIsEditDialogOpen(true)} 
              >
                <Edit className="w-6 h-6 text-gray-600" />
              </Button>
              <Button
              variant="outline"
              className="ml-5 text-sm"
              onClick={() => setIsEndDialogOpen(true)} 
              >
                End Round
              </Button>
            </>
            } 
            { isEditDialogOpen &&
            <>
              <Input
                type="text"
                className="w-[344px] p-2 border text-xl bg-white font-semibold border-gray-300 rounded-md"
                value={updateRoundName}
                onChange={(e) => setUpdateRoundName(e.target.value)}
              />
              <Button variant="outline" className="ml-4 w-[100px]" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
              <Button variant="default" className="ml-2 w-[100px]" onClick={handleEditRound} disabled={isEditingRound}>
                  {isEditingRound?(<LoaderCircle className="animate-spin" color="#FFF"/>):("Update")}
              </Button>
            </>
            }
          </>
        )}
      </div>
      
      { !isEditDialogOpen &&
      <>
       <p className="text-sm text-gray-700 mb-1"><span className="mr-[5px]">Start Date:</span> {localStartDateTime ? getFormattedDateFromString(localStartDateTime) : "TBD"}</p>
       <p className="text-sm text-gray-700 mb-4"><span className="mr-[5px]">End Date:</span> {localEndDateTime ? getFormattedDateFromString(localEndDateTime) : "TBD"}</p>
      </>
      }
      { isEditDialogOpen &&
      <>
     <div className="flex-row text-sm mb-5"> 
     <div className="flex items-center">
        <p className='mb-0 mr-1 w-[80px]'>Start Date: </p> 
        <DateTimePicker
          initialDate={startDateTime}
          onDateChange={handleStartDateChange}
          initialTime={startTime}
          onTimeChange={handleStartTimeChange}
        />
      </div>
      <div className="flex mt-1 items-center"> 
          <p className='mb-0 mr-1 w-[80px]'>End Date: </p>
          <DateTimePicker
            initialDate={endDateTime}
            onDateChange={handleEndDateChange}
            initialTime={endTime}
            onTimeChange={handleEndTimeChange}
          />
        </div>
        <p className='ml-[90px] mt-2 mb-2 text-red-500 text-sm'>{dateError}</p>
      </div>
      </>
      }
      
      <div className="overflow-x-auto mr-[100px]">
        <div className="inline-grid grid-cols-4 gap-x-5 gap-y-8 pb-4 min-w-[1050px] mr-[130px]">
          {filteredBrackets.map((bracket) => (
            <div key={bracket.id} className="w-[250px] bg-white shadow-sm p-4 rounded-lg">
              <TournamentBracket
                key={bracket.id}
                id={bracket.id}
                seqId={bracket.seqId}
                status={bracket.status}
                player1={bracket.player1}
                player2={bracket.player2}
                winner={bracket.winner}
                updateBracketStatus={updateBracketStatus}
              />
            </div>
          ))}
        </div>
      </div>
          
      {/* End round dialog */}
      <Dialog open={isEndDialogOpen} onOpenChange={setIsEndDialogOpen}>
        <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <DialogContent className="bg-white p-6 rounded-md shadow-md">
         <DialogTitle className="font-medium text-sm">Confirm End Round</DialogTitle>
         <p className="text-sm">Are you sure you want to end this round?</p>
         <div className="flex justify-end space-x-2 mt-4">
           <Button variant="outline" onClick={() => setIsEndDialogOpen(false)}>Cancel</Button>
           <Button className="w-[150px]" onClick={handleEndRound} disabled={isEndingRound}>
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

  if (!rounds) {
    return <div className="text-center p-4 mt-10">No tournament brackets data available</div>;
  }
  
  const filteredRounds = rounds.filter((round) => {
    return round.brackets.some(
      (bracket) =>
        bracket.player1 && bracket.player1?.username && bracket.player1?.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bracket.player2 && bracket.player2?.username && bracket.player2?.username?.toLowerCase().includes(searchQuery.toLowerCase())
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
        {filteredRounds
          .slice() 
          .sort((b, a) => a.seqId - b.seqId)
          .map((round) => (
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
