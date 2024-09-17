"use client"

import { BracketProps, PlayerInfo } from './types';
  

const TournamentBracket = ({ id, status, playerOne, playerTwo }: BracketProps) => {

    const getWinnerScore = (playerOne: PlayerInfo | undefined, playerTwo: PlayerInfo | undefined) => {
      if (playerOne && playerTwo && status === "completed") {
          if (playerOne.score === 0 && playerTwo.score === 0) {
              return ""; 
          }
          if (playerOne.score > playerTwo.score) {
              return playerOne.name;
          } 
          return playerTwo.name;
      }
  
      return undefined;
  };
  
    
  const isWinner = getWinnerScore(playerOne, playerTwo);
    
  return (

    <div className="p-4 w-64 min-w-64">
      <div className="space-y-1">

    {playerOne ? (

      <div className="flex items-center justify-between bg-white shadow-md p-1.5 rounded-full">
        <div className="flex items-center space-x-2">
          <div className={`${isWinner === playerOne?.name ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"} w-8 h-8  rounded-full flex items-center justify-center`}>
            <span className="text-sm">{playerOne?.name.charAt(0)}</span>
          </div>
          <p className={`${status != "completed" ? "font-medium text-black-500" : ""}${isWinner === playerOne?.name ? "font-medium" : "text-gray-500"}`}>{playerOne?.name}</p>
        </div>

         <div className={`${status != "completed" ? "font-medium text-black-500" : ""}${isWinner === playerOne?.name ? "logo_gradient text-white" : "text-gray-400"} w-8 h-8 rounded-full flex items-center justify-center`}>
            <span className="font-semibold">{playerOne?.score}</span>
        </div>
       
      </div>

    ):(

      <div className="flex items-center justify-between bg-transparent p-1.5 h-11 border-2 border-gray-400 rounded-full">
      </div>

    )}
    

    {playerTwo ? (
      <div className="flex items-center justify-between bg-white shadow-md p-1.5 rounded-full">
        <div className="flex items-center space-x-2">
        <div className={`${isWinner === playerTwo?.name ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"} w-8 h-8  rounded-full flex items-center justify-center`}>
            <span className="text-sm">{playerTwo?.name.charAt(0)}</span>
          </div>
          <p className={`${status != "completed" ? "font-medium text-black-500" : ""}${isWinner === playerTwo?.name ? "font-medium" : "text-gray-500"}`}>{playerTwo?.name}</p>
        </div>

        <div className={`${status != "completed" ? "font-medium text-black-500" : ""}${isWinner === playerTwo?.name ? "logo_gradient text-white" : "text-gray-400"} w-8 h-8 rounded-full flex items-center justify-center`}>
            <span className="font-semibold">{playerTwo?.score}</span>
        </div>
      </div>

     ):(

      <div className="flex items-center justify-between bg-transparent p-1.5 h-11 border-2 border-gray-400 rounded-full">
      </div>

    )}


    </div>
  </div>

  )
}

export default TournamentBracket