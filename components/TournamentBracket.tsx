"use client";

import { BracketProps, PlayerInfo } from './types';

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
        <div className="flex items-center justify-between bg-transparent p-1.5 h-11 border-2 border-gray-400 rounded-full"></div>
      );
    }

    return (
      <div className={`${!isWinner && status === "completed" ? "opacity-40" : ""} flex items-center justify-between bg-white shadow-md p-1.5 rounded-full`}>
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
    <div className="p-4 w-64 min-w-64">
      <div className="space-y-1">
        <PlayerCard player={playerOne} isWinner={isWinner === playerOne?.name} />
        <PlayerCard player={playerTwo} isWinner={isWinner === playerTwo?.name} />
      </div>
    </div>
  );
};

export default TournamentBracket;
