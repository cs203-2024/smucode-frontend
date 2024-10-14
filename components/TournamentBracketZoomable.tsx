import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Button } from "@/components/ui/button"
import { Crosshair, ZoomIn, ZoomOut } from 'lucide-react';
import { BracketProps, PlayerInfo, RoundProps, TournamentProps } from './types';
import { getFormattedDateFromString } from '@/lib/utils';

const TournamentBracket = ({ id, status, player1, player2 }: BracketProps) => {

  const getWinner = (player1: PlayerInfo | undefined, player2: PlayerInfo | undefined) => {
    if (player1 && player2 && status === "completed") {
      if (player1.score === 0 && player2.score === 0) {
        return ""; 
      }
      return player1.score > player2.score ? player1.username : player2.username;
    }
    return undefined;
  };

  const isWinner = getWinner(player1, player2);

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
            {player.image ? (
              <img src={player.image} alt={player.username} className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className="text-sm">{player.username.charAt(0)}</span>
            )}
          </div>
          <p className={`${status !== "completed" ? "font-medium text-black-500" : ""} font-medium`}>{player.username}</p>
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
        <PlayerCard player={player1} isWinner={isWinner === player1?.username} />
        <PlayerCard player={player2} isWinner={isWinner === player2?.username} />
      </div>
    </div>
  );
};



const TournamentRound: React.FC<RoundProps> = ({ id, name, brackets, startDate, endDate }) => {

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
      <p className="text-gray-700">Start Date: {startDate ? getFormattedDateFromString(startDate) : "TBD"}</p>
      <p className="text-gray-700 mb-4">End Date: {startDate ? getFormattedDateFromString(endDate) : "TBD"}</p>
      <div className={`${spacingClass} h-fit justify-center flex flex-col flex-grow overflow-hidden`}>
        {brackets.map((bracket) => (
          <div key={bracket.id} className="flex items-center">
            <TournamentBracket
              key={bracket.id}
              id={bracket.id}
              seqId={bracket.seqId}
              status={bracket.status}
              player1={bracket.player1}
              player2={bracket.player2}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const TournamentWrapper = ({ rounds } : TournamentProps) => {
  return (
    <div className="flex flex-row min-w-[100vw] space-x-4 overflow-x-auto p-4">
    {rounds.map((round) => (
      <div key={round.id} className="flex-shrink-0">
       <TournamentRound 
          key={round.id} 
          id={round.id} 
          seqId={round.seqId}
          name={round.name} 
          startDate={round.startDate}
          endDate={round.endDate}
          status={round.status}
          brackets={round.brackets}
         />
      </div>
    ))}
  </div>
  )
}


const TournamentBracketZoomable = ({ rounds } : TournamentProps) => {

  return (
    <TransformWrapper
      initialScale={0.7}
      minScale={0.5}
      maxScale={1.5}
      limitToBounds={false}
      centerOnInit={false}
    >
      {({ zoomIn, zoomOut, resetTransform }) => (
        <div>
          
          <div className="relative zoom-container bg-slate-50 w-[80vw] h-[80vh] overflow-hidden relative">
          <div className="controls absolute bottom-1 right-1 bg-transparent z-10">
            <Button variant="ghost" size="icon" onClick={() => zoomIn()}><ZoomIn /></Button>
            <Button variant="ghost" size="icon" onClick={() => zoomOut()}><ZoomOut /></Button>
            <Button variant="ghost" size="icon" onClick={() => resetTransform()}><Crosshair /></Button>
          </div>
            <TransformComponent>
              <div className="zoomable-content">
              <TournamentWrapper rounds={rounds} />
              </div>
            </TransformComponent>
          </div>
        </div>
      )}
    </TransformWrapper>
  );
};

export default TournamentBracketZoomable;