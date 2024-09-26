"use client";

import { useEffect, useState } from 'react';
import TournamentBracketZoomable from '@/components/TournamentBracketZoomable';
import TournamentBracketCards from '@/components/TournamentBracketCards'; 
import { fetchTournamentData } from '@/components/mockApi'; 
import { TournamentProps } from '@/components/types';
import { Icons } from "@/components/icons";


const TournamentBrackets: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>('A');

  const [tournamentData, setTournamentData] = useState<TournamentProps | null>(null);

  useEffect(() => {
    const getTournamentData = async () => {
      const data = await fetchTournamentData();
      setTournamentData(data);
    };

    getTournamentData();
  }, []);

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
            <Icons.bracket />
          </label>

          <label className="basis-1/2 pl-[5px]">
            <input
            type="radio"
            value="B"
            className="hidden"
            checked={selectedComponent === 'B'}
            onChange={handleToggleChange}
            />
            <Icons.grid />
          </label>
        </div>
      </div>


      <div>
        {tournamentData ? (
            <div>
                {selectedComponent === 'A' && <TournamentBracketZoomable rounds={tournamentData.rounds} />}
                {selectedComponent === 'B' && <TournamentBracketCards rounds={tournamentData.rounds} />}
            </div>
        ) : (
            <p>Loading tournament data...</p>
        )}
      </div>
    </div>
  );
};

export default TournamentBrackets;
