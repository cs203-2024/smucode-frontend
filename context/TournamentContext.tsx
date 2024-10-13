"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { fetchTournamentOverviewData } from '@/services/tournamentAPI'; 
import { TournamentOverviewProps } from '@/components/types'; 
interface TournamentContextType {
  loadingTournamentContext: boolean;
  tournamentId?: string;
  organizerId?: string;
  overviewData?: TournamentOverviewProps | null;
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
  const tournamentId = params?.id as string | undefined;
  const [organizerId, setOrganizerId] = useState<string | undefined>(undefined);
  const [overviewData, setOverviewData] = useState<TournamentOverviewProps | null>(null);
  const [loadingTournamentContext, setLoadingTournamentContext] = useState(true);

  useEffect(() => {
    if (tournamentId) {
      setLoadingTournamentContext(true);
      const fetchOrganizerId = async () => {
        try {
          const response = await fetchTournamentOverviewData(tournamentId);
          setOrganizerId(response?.organiser);
          setOverviewData(response);
        } catch (error) {
          console.error("Failed to fetch organizerId:", error);
        } finally {
          setLoadingTournamentContext(false);
        }
      };

      fetchOrganizerId();
    } else {
      setOrganizerId(undefined);
      setOverviewData(null);
    }
  }, [tournamentId]);

  return (
    <TournamentContext.Provider value={{ loadingTournamentContext, tournamentId, organizerId, overviewData }}>
      {children}
    </TournamentContext.Provider>
  );
};
