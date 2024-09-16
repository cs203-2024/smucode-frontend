"use client"

import TournamentBracket from './TournamentBracket';
import { RoundProps } from './types';

const TournamentRound: React.FC<RoundProps> = ({ name, id, brackets }) => {

  // Determine the spacing between brackets
  const getSpacingClass = (count: number) => {
    switch (count) {
      case 2:
        return "space-y-[380px]";
      case 4:
        return "space-y-[130px]";
      case 8:
        return "space-y-1";
      case 12:
        return "space-y-2";
      default:
        return "";
    }
  };

  const spacingClass = getSpacingClass(brackets.length);

  return (
    <div className={`p-6 h-full w-[20vw] min-w-80 flex flex-col`}>
      <h2 className="font-bold mb-4 min-w-70 text-2xl">{name}</h2>
      <p className="text-gray-700 mb-4">Round ID: {id}</p>
      <div className={`${spacingClass} h-fit justify-center flex flex-col flex-grow overflow-hidden`}>
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