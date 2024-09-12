"use client"

import TournamentBracket from './TournamentBracket';
import { RoundProps } from './types';

const TournamentRound: React.FC<RoundProps> = ({ name, id, brackets }) => {
    
  // Determine the layout classes based on the number of brackets
  const getLayoutClasses = (count: number) => {
    switch (count) {
      case 1:
        return "flex flex-col justify-center";
      case 2:
      case 4:
      case 8:
      case 12:
        return "flex flex-col justify-center";
      default:
        return "flex flex-col space-y-4";
    }
  };

  // Determine the spacing between brackets
  const getSpacingClass = (count: number) => {
    switch (count) {
      case 2:
        return "space-y-[18vh]";
      case 4:
        return "space-y-4";
      case 8:
        return "space-y-1";
      case 12:
        return "space-y-2";
      default:
        return "";
    }
  };

  const layoutClasses = getLayoutClasses(brackets.length);
  const spacingClass = getSpacingClass(brackets.length);

  return (
    <div className="p-6 bg-white h-[90vh] w-[20vw] flex flex-col">
      <h2 className="text-2xl font-bold mb-4">{name}</h2>
      <p className="text-gray-700 mb-4">Round ID: {id}</p>
      <div className={`${layoutClasses} ${spacingClass} flex-grow overflow-hidden`}>
        {brackets.map((bracket) => (
          <div key={bracket.id} className="flex items-center">
            <TournamentBracket
              id={bracket.id}
              playerOne={bracket.playerOne}
              playerTwo={bracket.playerTwo}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentRound;