"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { fetchTournamentOrganizerId } from '@/components/mockApi'; 

interface TournamentContextType {
  id?: string;
  organizerId?: string;
}

const TournamentContext = createContext<TournamentContextType | undefined>(undefined);

export const useTournamentContext = (): TournamentContextType => {
  const context = useContext(TournamentContext);
  if (!context) {
    throw new Error("useTournamentId must be used within a TournamentIdProvider");
  }
  return context;
};


interface TournamentContextProviderProps {
  children: ReactNode;
}

export const TournamentContextProvider = ({ children }: TournamentContextProviderProps) => {
  const params = useParams();
  const id = params?.id as string | undefined;
  const [organizerId, setOrganizerId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (id) {
      // Fetch the organizerId based on the id
      const fetchOrganizerId = async () => {
        try {
          const response = await fetchTournamentOrganizerId(id);
          setOrganizerId(response.organizerId);
        } catch (error) {
          console.error("Failed to fetch organizerId:", error);
        }
      };

      fetchOrganizerId();
    } else {
      setOrganizerId(undefined);
    }
  }, [id]);

  return (
    <TournamentContext.Provider value={{ id, organizerId }}>
      {children}
    </TournamentContext.Provider>
  );
};
