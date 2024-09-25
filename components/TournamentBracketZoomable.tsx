
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Button } from "@/components/ui/button"
import { Crosshair, ZoomIn, ZoomOut } from 'lucide-react';
import { BracketProps, PlayerInfo, RoundProps, TournamentProps } from './types';


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



const TournamentRound: React.FC<RoundProps> = ({ name, id, brackets }) => {

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
              status={bracket.status}
              playerOne={bracket.playerOne}
              playerTwo={bracket.playerTwo}
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
       <TournamentRound key={round.id} name={round.name} id={round.id} brackets={round.brackets} />
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
          
          <div className="relative zoom-container bg-slate-50 w-[100vw] h-[80vh] overflow-hidden relative">
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