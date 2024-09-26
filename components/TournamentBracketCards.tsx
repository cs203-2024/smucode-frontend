"use client"

import { useState } from 'react';
import { TournamentProps, RoundProps, BracketProps, PlayerInfo } from './types';



const TournamentBracket = ({ id, status, playerOne, playerTwo }: BracketProps) => {
  const getWinner = (playerOne: PlayerInfo | undefined, playerTwo: PlayerInfo | undefined) => {
    if (playerOne && playerTwo && status === "completed") {
      if (playerOne.score === 0 && playerTwo.score === 0) {
        return ""; 
      }
      return playerOne.score > playerTwo.score ? playerOne.name : playerTwo.name;
    }
    return undefined;
  };

  const isWinner = getWinner(playerOne, playerTwo);

  const PlayerCard = ({ player, isWinner }: { player: PlayerInfo | undefined, isWinner: boolean }) => {
    if (!player) {
      return (
        <div className="flex items-center justify-between bg-transparent p-1.5 h-11 border-gray-400 rounded-full"></div>
      );
    }

    return (
      <div className={`${!isWinner && status === "completed" ? "opacity-40" : ""} flex items-center py-1 justify-between text-sm`}>
        <div className="flex items-center space-x-2">
          <div className={`${isWinner ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"} w-8 h-8 rounded-full flex items-center justify-center`}>
            <span className="text-sm">{player.name.charAt(0)}</span>
          </div>
          <p className={`${status !== "completed" ? "font-medium text-black-500" : ""} font-medium`}>{player.name}</p>
        </div>
        <div className={`${status !== "completed" ? "font-medium text-black-500" : ""} ${isWinner ? "logo_gradient text-white" : ""} w-8 h-8 rounded-full flex items-center justify-center`}>
          <span className="font-semibold">{player.score}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="py-2 px-1">
      <div className="space-y-1">
        <PlayerCard player={playerOne} isWinner={isWinner === playerOne?.name} />
        <PlayerCard player={playerTwo} isWinner={isWinner === playerTwo?.name} />
      </div>
    </div>
  );
};

const TournamentRound: React.FC<RoundProps & { searchQuery: string }> = ({ name, id, brackets, searchQuery }) => {
  const filteredBrackets = brackets.filter(
    (bracket) =>
      bracket.playerOne?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bracket.playerTwo?.name.toLowerCase().includes(searchQuery.toLowerCase())
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
      <h2 className="font-bold mb-4 text-xl">{name}</h2>
      <p className="text-gray-700 mb-4">Round ID: {id}</p>
      <div className="overflow-x-auto">
        <div className="inline-grid grid-cols-4 gap-x-5 gap-y-8 pb-4 min-w-[1050px]">
          {filteredBrackets.map((bracket) => (
            <div
              key={bracket.id}
              className="w-[250px] bg-white shadow-sm p-4 rounded-lg"
            >
              <TournamentBracket
                id={bracket.id}
                status={bracket.status}
                playerOne={bracket.playerOne}
                playerTwo={bracket.playerTwo}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TournamentBracketCard = ({ rounds }: TournamentProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter rounds
  const filteredRounds = rounds.filter((round) => {
    return round.brackets.some(
      (bracket) =>
        bracket.playerOne?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bracket.playerTwo?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  })
  .reverse();

  if (filteredRounds.length === 0) {
    return (
      <div className="flex flex-col bg-slate-50 min-w-[80vw] space-y-8 overflow-y-auto p-4">
        <div className="mb-3">
        <input
          type="text"
          placeholder="Search player name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-3 py-1.5 ml-5 border text-sm border-gray-400 rounded-lg"
        />
        <div className="ml-8 mt-1 pb-[80vh] text-sm text-gray-600">
          <p>No results found.</p>
        </div>
        </div>
        
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-slate-50 w-[80vw] h-[80vh] space-y-8 overflow-y-auto p-4">
      
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search player name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-3 py-1.5 ml-5 border text-sm border-gray-400 rounded-lg"
        />
      </div>

      <div className='overflow-y-auto h-[80vh]'>
        {filteredRounds.map((round) => (
          <div key={round.id} className="flex-shrink-0">
            <TournamentRound
              name={round.name}
              id={round.id}
              brackets={round.brackets}
              searchQuery={searchQuery}
            />
          </div>
        ))}
      </div>
    </div>
  );
};


const TournamentBracketCards = ({ rounds }: TournamentProps) => {
  
  return (
    <TournamentBracketCard rounds={rounds} />
  );
};

export default TournamentBracketCards;
