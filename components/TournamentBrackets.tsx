"use client";

import { useEffect, useState } from 'react';
import TournamentBracketZoomable from '@/components/TournamentBracketZoomable';
import TournamentBracketCards from '@/components/TournamentBracketCards'; 
import { fetchTournamentBracketsData } from '@/components/mockApi'; 
import { TournamentProps } from '@/components/types';
import { Icons } from "@/components/icons";
import { useTournamentId } from "@/context/TournamentIdContext";
import { Skeleton } from './ui/skeleton';
import { LayoutGrid } from 'lucide-react';

const TournamentBrackets: React.FC = () => {
  const tournamentId = useTournamentId();
  const [viewMode, setViewMode] = useState<string>('card');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tournamentData, setTournamentData] = useState<TournamentProps | null>(null);

  useEffect(() => {
    const loadTournamentData = async () => {
      try {
        const data = await fetchTournamentBracketsData(tournamentId);
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
          <p className="font-bold text-2xl ml-3 mt-[2px] mb-5">Tournament Brackets</p>
          <div className="flex flex-col bg-slate-50 w-full h-[85vh] space-y-8 overflow-y-auto p-1">
          <div className="mb-3">
            <Skeleton className="w-[250px] h-8 ml-5" />
          </div>
          <div className='overflow-y-auto h-[80vh] w-full'>
            <div key="1" className="flex-shrink-0">
                <div className="p-6 h-full w-full">
                  <Skeleton className="w-40 h-8 mb-5" />
                  <Skeleton className="w-32 h-6 mb-4" />
                  <div className="overflow-x-auto mr-[100px]">
                  <div className="inline-grid grid-cols-4 gap-x-5 gap-y-8 pb-4 min-w-[1050px] mr-[130px]">
                      {[1, 2].map((bracketIndex) => (
                      <Skeleton key={bracketIndex} className="w-[250px] h-[132px] shadow-sm p-4 rounded-lg" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            {[2, 3].map((roundIndex) => (
              <div key={roundIndex} className="flex-shrink-0">
                <div className="p-6 h-full w-full">
                  <Skeleton className="w-40 h-6 mb-5" />
                  <Skeleton className="w-32 h-4 mb-4" />
                  <div className="overflow-x-auto mr-[100px]">
                  <div className="inline-grid grid-cols-4 gap-x-5 gap-y-8 pb-4 min-w-[1050px] mr-[130px]">
                      {[1, 2, 3, 4].map((bracketIndex) => (
                      <Skeleton key={bracketIndex} className="w-[250px] h-[125px] shadow-sm p-4 rounded-lg" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
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

  if (!tournamentData) {
    return <div className="text-center p-4 mt-10">No tournament brackets data available</div>;
  }

  return (
    <div>
      <div className="flex items-center mb-4 space-x-5"> 
        <p className="font-bold text-2xl mt-[2px] ml-3">Tournament Brackets</p>
  
        <div className="flex space-x-1">
          <button
            className={`p-[4px] rounded-lg ${viewMode === 'card' ? 'bg-themelightblue text-themeblue' : 'bg-gray-200'}`}
            onClick={() => setViewMode('card')}
          >
           <LayoutGrid />
          </button>
          <button
            className={`p-[4px] rounded-lg ${viewMode === 'bracket' ? 'bg-themelightblue text-themeblue' : 'bg-gray-200'}`}
            onClick={() => setViewMode('bracket')}
          >
            <Icons.bracket />
          </button>
        </div>
      </div>
      
      <div>
            <div>
                {viewMode === 'bracket' && <TournamentBracketZoomable rounds={tournamentData.rounds} />}
                {viewMode === 'card' && <TournamentBracketCards rounds={tournamentData.rounds} />}
            </div>
      </div>
    </div>
  );
};

export default TournamentBrackets;
