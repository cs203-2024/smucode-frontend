"use client"

import Image from 'next/image';
import { useTournamentContext } from '@/context/TournamentContext';
import { PlayerCardProps } from '../types';

const PlayerCard: React.FC<PlayerCardProps> = ({ player, isWinner, status, isCardView }) => {
  const { showPrediction } = useTournamentContext();

  if (!player || !player.username) {
    return (
        <>
            <div className="flex items-center text-sm text-gray-400 justify-center bg-transparent p-1 h-11 border-2 border-gray-400 rounded-full">
            {status == "UPCOMING" ? (
                <p>TBD</p>
            ):(
                <p>Withdrawn</p>
            )}
            </div>
        </>
    );
  }

  return (
    <div
      className={`${
        !isWinner && status === 'COMPLETED' ? 'opacity-40' : ''
      } ${isCardView ? "py-1.5":"shadow-md p-1.5"} flex items-center justify-between text-sm bg-white rounded-full`}
    >
      <div className="flex items-center space-x-2">
        <div
          className={`${
            isWinner ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
          } w-8 h-8 rounded-full flex items-center justify-center`}
        >
          {player.image ? (
            <Image
              src={player.image}
              width={32}
              height={32}
              className="rounded-full w-8 h-8 object-cover"
              alt={player.username}
            />
          ) : (
            <span className="text-sm">{player.username.charAt(0).toUpperCase()}</span>
          )}
        </div>
        <p
          className={`${
            status !== 'COMPLETED' ? 'font-medium text-black-500' : ''
          } font-medium`}
        >
          {player.username}
        </p>
        {showPrediction && player.winProbability && (
          <span
            className={`pl-1 ${
              player.winProbability >= 0.5 ? 'text-green-500' : 'text-orange-500'
            }`}
          >
            {Math.round(player.winProbability * 100)}%
          </span>
        )}
      </div>
      <div
        className={`${
          status !== 'COMPLETED' ? 'font-medium text-black-500' : ''
        } ${isWinner ? 'logo_gradient text-white' : ''} w-8 h-8 rounded-full flex items-center justify-center`}
      >
        <span className="font-semibold">{player.score}</span>
      </div>
    </div>
  );
};

export default PlayerCard;
