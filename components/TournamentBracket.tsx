"use client"

import { BracketProps, PlayerInfo } from './types';
  

// TODO: if player==null display empty bracket

const TournamentBracket = ({ id, playerOne, playerTwo }: BracketProps) => {

    const getWinnerScore = (playerOne : PlayerInfo ,playerTwo:PlayerInfo ) => {
        if(playerOne.score && playerTwo.score == 0){
            return ""
        }
        if(playerOne.score > playerTwo.score){
            return playerOne.name;
        } else {
            return playerTwo.name;
        }
      };
    
    const isWinner = getWinnerScore(playerOne, playerTwo);
    
  return (
    <div className="p-4 w-64 min-w-64">
    {/* <h2 className="text-lg font-semibold mb-3">{id}</h2> */}
    <div className="space-y-1">

    
    {/* Player one */}
      <div className="flex items-center justify-between bg-white shadow-md p-1.5 rounded-full">
        <div className="flex items-center space-x-2">
          <div className={`${isWinner === playerOne.name ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"} w-8 h-8  rounded-full flex items-center justify-center`}>
            <span className="text-sm">{playerOne.name.charAt(0)}</span>
          </div>
          <p className={`${isWinner === playerOne.name ? "font-medium" : "text-gray-500"}`}>{playerOne.name}</p>
        </div>

         <div className={`${isWinner === playerOne.name ? "orange_gradient text-white" : "text-gray-400"} w-8 h-8 rounded-full flex items-center justify-center`}>
            <span className="font-semibold">{playerOne.score}</span>
        </div>
       
      </div>

    {/* Player two */}
      <div className="flex items-center justify-between bg-white shadow-md p-1.5 rounded-full">
        <div className="flex items-center space-x-2">
        <div className={`${isWinner === playerTwo.name ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"} w-8 h-8  rounded-full flex items-center justify-center`}>
            <span className="text-sm">{playerTwo.name.charAt(0)}</span>
          </div>
          <p className={`${isWinner === playerTwo.name ? "font-medium" : "text-gray-500"}`}>{playerTwo.name}</p>
        </div>

        <div className={`${isWinner === playerTwo.name ? "orange_gradient text-white" : "text-gray-400"} w-8 h-8 rounded-full flex items-center justify-center`}>
            <span className="font-semibold">{playerTwo.score}</span>
        </div>
      </div>

    </div>
  </div>

  )
}

export default TournamentBracket