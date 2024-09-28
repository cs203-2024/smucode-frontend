"use client";

import { useEffect, useState } from 'react';
import TournamentBracketZoomable from '@/components/TournamentBracketZoomable';
import TournamentBracketCards from '@/components/TournamentBracketCards'; 
import { fetchTournamentBracketsData } from '@/components/mockApi'; 
import { TournamentProps } from '@/components/types';
import { Icons } from "@/components/icons";
import { useTournamentId } from "@/context/TournamentIdContext";
import { Skeleton } from './ui/skeleton';

const TournamentBrackets: React.FC = () => {
  const tournamentId = useTournamentId();
  const [selectedComponent, setSelectedComponent] = useState<string>('B');
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
          <div className="flex flex-col bg-slate-50 w-[80vw] h-[85vh] space-y-8 overflow-y-auto p-1">
          <div className="mb-3">
            <Skeleton className="w-48 h-8 ml-5" />
          </div>
          <div className='overflow-y-auto h-[80vh]'>
            <div key="1" className="flex-shrink-0">
                <div className="p-6 h-full w-full">
                  <Skeleton className="w-40 h-8 mb-5" />
                  <Skeleton className="w-32 h-6 mb-4" />
                  <div className="overflow-x-auto">
                    <div className="inline-grid grid-cols-4 gap-x-5 gap-y-8 pb-4 min-w-[1050px]">
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
                  <div className="overflow-x-auto">
                    <div className="inline-grid grid-cols-4 gap-x-5 gap-y-8 pb-4 min-w-[1050px]">
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

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedComponent(event.target.value);
  };

  return (
    <div>
      <div className="flex items-center mb-4 space-x-5"> 
        <p className="font-bold text-2xl ml-3">Tournament Brackets</p>
  
        <div className="radio-buttons w-[80px] h-[36px] flex flex-row items-center border text-sm border-gray-300 rounded-sm">
          <label className="basis-1/2 pl-[10px]">
            <input
            type="radio"
            value="B"
            className="hidden"
            checked={selectedComponent === 'B'}
            onChange={handleToggleChange}
            />

          
          <Icons.grid
            className={`cursor-pointer ${
              selectedComponent === 'B' ? 'text-blue-500' : 'text-gray-400'
            }`}
          />
          </label>

          <label className="basis-1/2 pl-[8px]">
            <input
            type="radio"
            value="A"
            className="hidden"
            checked={selectedComponent === 'A'}
            onChange={handleToggleChange}
            />
            <Icons.bracket 
            className={`cursor-pointer ${
              selectedComponent === 'A' ? 'text-blue-500' : 'text-gray-400'
            }`} 
          />
          </label>
        </div>
      </div>


      <div>
            <div>
                {selectedComponent === 'A' && <TournamentBracketZoomable rounds={tournamentData.rounds} />}
                {selectedComponent === 'B' && <TournamentBracketCards rounds={tournamentData.rounds} />}
            </div>
      </div>
    </div>
  );
};

export default TournamentBrackets;
