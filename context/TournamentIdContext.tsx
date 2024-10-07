
"use client";

import { createContext, ReactNode, useContext } from "react";
import { useParams } from 'next/navigation';

interface TournamentIdContextType {
  id?: string;
}


const TournamentIdContext = createContext<TournamentIdContextType | undefined>(undefined);


export const useTournamentId = (): string | undefined => {
  const context = useContext(TournamentIdContext);
  if (!context) {
    throw new Error("useTournamentId must be used within a TournamentIdProvider");
  }
  return context.id;
};


interface TournamentIdProviderProps {
  children: ReactNode;
}

export const TournamentIdProvider = ({ children }: TournamentIdProviderProps) => {
  const params = useParams();
  const id = params?.id as string | undefined; 
  return (
    <TournamentIdContext.Provider value={{ id }}>
      {children}
    </TournamentIdContext.Provider>
  );
};
