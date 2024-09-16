import React, { useEffect, useRef } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import TournamentData from "./TournamentData";
import { Button } from "@/components/ui/button"
import { Crosshair, ZoomIn, ZoomOut } from 'lucide-react';

const TournamentBracketWrapper: React.FC = () => {

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
                <TournamentData />
              </div>
            </TransformComponent>
          </div>
        </div>
      )}
    </TransformWrapper>
  );
};

export default TournamentBracketWrapper;