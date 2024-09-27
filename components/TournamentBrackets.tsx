"use client";

import { useEffect, useState } from 'react';
import TournamentBracketZoomable from '@/components/TournamentBracketZoomable';
import TournamentBracketCards from '@/components/TournamentBracketCards'; 
import { fetchTournamentBracketsData } from '@/components/mockApi'; 
import { TournamentProps } from '@/components/types';
import { Icons } from "@/components/icons";
import { useTournamentId } from "@/context/TournamentIdContext";

const TournamentBrackets: React.FC = () => {
  const tournamentId = useTournamentId();
  const [selectedComponent, setSelectedComponent] = useState<string>('A');
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
    return <div className="text-center p-4 mt-10">Loading tournament brackets data...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500 mt-10">{error}</div>;
  }

  if (!tournamentData) {
    return <div className="text-center p-4 mt-10">No tournament data brackets available</div>;
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

          <label className="basis-1/2 pl-[5px]">
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
