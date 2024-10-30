"use client";

import { useEffect, useState } from 'react';
import { TournamentProps, RoundProps, PlayerInfo, BracketProps } from '../types';
import { Button } from '../ui/button';
import { Edit, LoaderCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { DialogFooter, DialogHeader } from '../ui/dialog';
import { Input } from '../ui/input';
import { updateBracketScore, endBracket, endRound, updateRoundStartEndDate } from '@/services/tournamentAPI';
import { toast } from "sonner";
import { useTournamentContext } from '@/context/TournamentContext';
import { useUserContext } from '@/context/UserContext';
import { formatDateToShortTime,getFormattedDateFromString } from '@/lib/utils';
import { DateTimePicker } from '@/components/DateTimePicker'

const PlayerCard: React.FC<{ player: PlayerInfo | undefined; isWinner: boolean; status: string }> = ({ player, isWinner, status }) => {
  if (!player || !player.username) return <div className="flex items-center justify-between bg-transparent p-1.5 h-10 border-gray-400 rounded-full"></div>;
  return (
    <div className={`${!isWinner && status === "completed" ? "opacity-40" : ""} flex items-center py-1 justify-between text-sm`}>
      <div className="flex items-center space-x-2">
        <div className={`${isWinner ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"} w-8 h-8 rounded-full flex items-center justify-center`}>
          {player.image ? (
            <img src={player.image} alt={player.username} className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-sm">{player.username.charAt(0)}</span>
          )}
        </div>
        <p className={`${status !== "completed" ? "font-medium text-black-500" : ""} font-medium`}>{player.username}</p>
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
            <img src={player.image} alt={player.username} className="w-full h-full rounded-full object-cover" />
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
      />
    </div>
  );
};

const TournamentBracket: React.FC<BracketProps> = ({ id, status, player1, player2 }) => {
  const tournamentContext = useTournamentContext();
  const { user } = useUserContext();
  const tournamentOrganizerId = tournamentContext.organizerId;
  const [isHovered, setIsHovered] = useState(false);
  const [editedplayer1, setEditedplayer1] = useState(player1);
  const [editedplayer2, setEditedplayer2] = useState(player2);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEnding, setIsEnding] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [bracketStatus, setBracketStatus] = useState(status);
  const getWinner = (player1: PlayerInfo | undefined, player2: PlayerInfo | undefined) => {
    if (player1 && player2 && player1.username && player2.username && bracketStatus === "completed") {
      if (player1.score === 0 && player2.score === 0) return "";
      return player1.score > player2.score ? player1.username : player2.username;
    }
    return undefined;
  };
  
  const [isWinner, setIsWinner] = useState(getWinner(player1, player2)); 
  
  useEffect(() => {
    if (bracketStatus === "completed") {
      setIsWinner(getWinner(player1, player2));
    }
  }, [bracketStatus]);

  useEffect(() => {
    if(user){
      setIsEditable(status === "ongoing" && tournamentOrganizerId === user?.username);
    }
  }, [user]);


  const handleUpdate = async () => {
    if (editedplayer1 && editedplayer2 && !isUpdating) {
      setIsUpdating(true);
      try {
        await updateBracketScore(id, editedplayer1, editedplayer2);
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
    if (player1 && player2 && !isEnding) {
      setIsEnding(true);
      try {
        await endBracket(id);
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
          className={`relative group py-2 px-1 ${isEditable ? 'cursor-pointer' : ''}`}
          onMouseEnter={() => isEditable && setIsHovered(true)}
          onMouseLeave={() => isEditable && setIsHovered(false)}
        >
          <div className={`space-y-1 ${isHovered ? 'blur-sm' : ''} transition-all duration-200`}>
            <PlayerCard player={player1} isWinner={isWinner === player1?.username} status={bracketStatus} />
            <PlayerCard player={player2} isWinner={isWinner === player2?.username} status={bracketStatus} />
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

const TournamentRound: React.FC<RoundProps & { searchQuery: string }> = ({ name, id, status, startDateTime, endDateTime, brackets, searchQuery }) => {
  const tournamentContext = useTournamentContext();
  const { user } = useUserContext();
  const tournamentOrganizerId = tournamentContext.organizerId;
  const [isEndDialogOpen, setIsEndDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isEndingRound, setIsEndingRound] = useState(false);
  const [roundStatus, setRoundStatus] = useState(status);
  const [isEditable, setIsEditable] = useState(false);
  const [isEditingRound, setIsEditingRound] = useState(false);
  const [localStartDateTime, setLocalStartDateTime] = useState<string>(startDateTime);
  const [localEndDateTime, setLocalEndDateTime] = useState<string>(endDateTime)
  const [startDate, setStartDate] = useState<Date | undefined>(startDateTime ? new Date(startDateTime) : undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(endDateTime ? new Date(endDateTime) : undefined);
  const [startTime, setStartTime] = useState<string>(startDateTime ? formatDateToShortTime(new Date(startDateTime)) : "09:00");
  const [endTime, setEndTime] = useState<string>(endDateTime ? formatDateToShortTime(new Date(endDateTime)) : "18:00");
  const [dateError, setDateError ] = useState<string>("");
  const [updateStartDate, setUpdateStartDate] = useState<Date | undefined>(undefined);
  const [updateEndDate, setUpdateEndDate] = useState<Date | undefined>(undefined);

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
    if (startDate && endDate) {
      const [startHours, startMinutes] = startTime.split(':').map(Number);
      const [endHours, endMinutes] = endTime.split(':').map(Number);

      const startDateTime = new Date(startDate);
      startDateTime.setHours(startHours, startMinutes);

      const endDateTime = new Date(endDate);
      endDateTime.setHours(endHours, endMinutes);
      
      if (endDateTime <= startDateTime) {
        setDateError("End date/time is before start date/time.");
        setUpdateStartDate(undefined);
        setUpdateEndDate(undefined);
      } else {
        setDateError("");
        setUpdateStartDate(startDateTime);
        setUpdateEndDate(endDateTime);
      }
    }
  }, [startDate, endDate, startTime, endTime]);

  // Admin editable logic
  useEffect(() => {
    if(user){
      setIsEditable(roundStatus === "ongoing" && tournamentOrganizerId === user?.username);
    }
  }, [user,roundStatus]);

   // Handle actions
  const handleEndRound = async () => {
    const allBracketsCompleted = brackets.every((bracket) => bracket.status === "completed");

    if (!allBracketsCompleted) {
      toast.error("All brackets must be completed before ending the round.");
      return; 
    }

    if (!isEndingRound) {
      setIsEndingRound(true);
      try {
        await endRound(id);
        toast.success("Round ended!");
        setRoundStatus("completed");
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
        await updateRoundStartEndDate(id, updateStartDate, updateEndDate);
        toast.success("Successfully updated round details");
        setLocalStartDateTime(updateStartDate.toLocaleString("en-GB", {dateStyle: "short",timeStyle: "short"}));
        setLocalEndDateTime(updateEndDate.toLocaleString("en-GB", {dateStyle: "short",timeStyle: "short"}));
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
      bracket.player1?.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bracket.player2?.username.toLowerCase().includes(searchQuery.toLowerCase())
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
        <h2 className="font-bold text-xl">{name}</h2>

        {isEditable && (
          <>
            <Button
              variant="outline"
              className="ml-5 text-sm"
              onClick={() => setIsEditDialogOpen(true)} 
            >
              Edit
            </Button>

            <Button
              variant="outline"
              className="ml-5 text-sm"
              onClick={() => setIsEndDialogOpen(true)} 
            >
              End Round
            </Button>
          </>
        )}
      </div>

      <p className="text-sm text-gray-700">Start Date: {localStartDateTime ? getFormattedDateFromString(localStartDateTime) : "TBD"}</p>
      <p className="text-sm text-gray-700 mb-4">End Date: {localEndDateTime ? getFormattedDateFromString(localEndDateTime) : "TBD"}</p>
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
              />
            </div>
          ))}
        </div>
      </div>

      {/* Edit round dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <DialogContent className="bg-white p-6 rounded-md shadow-md">
         <DialogTitle className="font-medium text-sm">Update Round Start/End Date</DialogTitle>
         <div className='text-sm m-6'>
            <p className='mt-2 mb-1'>Start Date & Time</p>
            <DateTimePicker
              initialDate={startDate}
              onDateChange={handleStartDateChange}
              initialTime={startTime}
              onTimeChange={handleStartTimeChange}
            />
            <p className='mt-2 mb-1'>End Date & Time</p>
            <DateTimePicker
              initialDate={endDate}
              onDateChange={handleEndDateChange}
              initialTime={endTime}
              onTimeChange={handleEndTimeChange}
            />
            <p className='mt-4 text-red-500'>{dateError}</p>
          </div>
         <div className="flex justify-end space-x-2 mt-4">
           <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
           <Button className="w-[150px]" onClick={handleEditRound} disabled={isEditingRound}>
                {isEndingRound?(<LoaderCircle className="animate-spin" color="#FFF"/>):("Update")}
            </Button>
         </div>
       </DialogContent>
       </DialogOverlay>
      </Dialog>
          



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
        bracket.player1?.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bracket.player2?.username?.toLowerCase().includes(searchQuery.toLowerCase())
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
              startDateTime={round.startDateTime}
              endDateTime={round.endDateTime}
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
