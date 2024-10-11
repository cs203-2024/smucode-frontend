'use client';

import { useEffect, useState } from 'react';
import { User, Trophy, Medal, Grid, List } from 'lucide-react';
import { useTournamentContext } from "@/context/TournamentContext";
import { fetchTournamentParticipantsData } from '@/components/mockApi';
import { ParticipantCardListProp, Participant } from '@/components/types';
import { Skeleton } from './ui/skeleton';

interface ParticipantCardProps {
  participant: Participant;
  viewMode: 'grid' | 'list';
}

const ParticipantCard: React.FC<ParticipantCardProps> = ({ participant, viewMode }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm p-3 ${viewMode === 'grid' ? 'flex flex-col items-center' : 'flex items-center'}`}>
      <div className={`relative ${viewMode === 'grid' ? 'mb-2' : 'mr-3'}`}>
        <div className='w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center'>
            {participant.profilePicture ? (
              <img src={participant.profilePicture} alt={participant.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className="text-md">{participant.name.charAt(0)}</span>
            )}
        </div>
        {participant.rank <= 3 && (
          <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-0.5">
            {participant.rank === 1 ? <Trophy size={12} /> : <Medal size={12} />}
          </div>
        )}
      </div>
      <div className={`${viewMode === 'grid' ? 'text-center' : 'flex-grow'}`}>
        <h2 className="text-sm font-semibold text-black mb-0.5">{participant.name}</h2>
        <p className="text-xs text-gray-600 mb-0.5">Rank: {participant.rank}</p>
        <div className={`${viewMode === 'grid' ? 'flex justify-between text-xs' : 'flex space-x-2 text-sm'}`}>
          <p className="text-green-600 font-semibold">W: {participant.wins}</p>
          <p className="text-red-600 font-semibold">L: {participant.losses}</p>
        </div>
      </div>
    </div>
  );
};


const TournamentParticipantsList: React.FC = () => {
  const tournamentContext = useTournamentContext();
  const tournamentId = tournamentContext.id;
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [tournamentData, setTournamentData] = useState<ParticipantCardListProp | null>(null);

  useEffect(() => {
    const loadTournamentData = async () => {
      try {
        const data = await fetchTournamentParticipantsData(tournamentId);
        setTournamentData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load tournament data');
        setLoading(false);
      }
    };

    loadTournamentData();
  }, [tournamentId]);

  if (loading) {
    return (
      <div>
        <div className="items-center"> 
          <p className="font-bold text-2xl ml-3 mt-[2px] mb-5">Tournament Participants</p>
          <div className="flex flex-col bg-slate-50 space-y-8 overflow-y-auto p-1">
            <Skeleton className="w-[250px] h-8 ml-5 rounded-lg" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-[20px] lg:grid-cols-4 gap-3 max-w-6xl max-h-[65vh] overflow-y-auto p-[5px] pb-[100px]">
              {[...Array(8)].map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-[136px] rounded-xl shadow-sm"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  

  if (error) {
    return <div className="text-center p-4 text-red-500 mt-10">{error}</div>;
  }

  if (!tournamentData || tournamentData.participants.length === 0) {
    return <div className="text-center p-4 mt-10">No tournament participants data available</div>;
  }

  const filteredParticipants = tournamentData.participants.filter((participant) =>
    participant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div>
      {/* Search bar */}
      <div className="flex items-center mb-4 space-x-5">
        <p className="font-bold text-2xl mt-[2px] ml-3">Tournament Participants</p>
        
        
        <div className="flex space-x-1">
          <button
            className={`p-[4px] rounded-lg ${viewMode === 'grid' ? 'bg-themelightblue text-themeblue' : 'bg-gray-200'}`}
            onClick={() => setViewMode('grid')}
          >
            <Grid />
          </button>
          <button
            className={`p-[4px] rounded-lg ${viewMode === 'list' ? 'bg-themelightblue text-themeblue' : 'bg-gray-200'}`}
            onClick={() => setViewMode('list')}
          >
            <List />
          </button>
        </div>
      </div>

      <div className="bg-slate-50 space-y-8 overflow-y-auto p-1">
        <div className="mb-3">
          <input
          type="text"
          placeholder="Search participant..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-3 py-1.5 w-[250px] ml-5 border text-sm border-gray-400 rounded-lg"
          />
        </div>
        
        {filteredParticipants.length === 0 ? (
          <div className="ml-8 text-sm text-gray-600">
            <p>No results found.</p>
         </div>
        ) : (
          <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 m-[20px] lg:grid-cols-4 gap-3 max-w-6xl max-h-[65vh] overflow-y-auto p-[5px] pb-[100px]'
              : 'space-y-3 max-w-screen max-h-[65vh] m-[20px] overflow-y-auto p-[5px] pb-[100px] text-left'
          }
          >
          {filteredParticipants.map((participant) => (
            <ParticipantCard key={participant.id} participant={participant} viewMode={viewMode} />
          ))}
          </div>
        )}
      
      </div>
    </div>
  );
};

export default TournamentParticipantsList;
