"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from 'next/navigation';
import { fetchTournamentOverviewData } from '@/services/tournamentAPI'; 
import { TournamentOverviewProps } from '@/components/types'; 

interface TournamentContextType {
  loadingTournamentContext: boolean;
  tournamentId?: string;
  organizerId?: string;
  overviewData?: TournamentOverviewProps | null;
  showPrediction: boolean;
  setShowPrediction: (value: boolean) => void;
}

const TournamentContext = createContext<TournamentContextType | undefined>(undefined);

export const useTournamentContext = (): TournamentContextType => {
  const context = useContext(TournamentContext);
  if (!context) {
    throw new Error("useTournamentContext must be used within a TournamentContextProvider");
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
  const [showPrediction, setShowPrediction] = useState<boolean>(false); 
  
  // useMemo to prevent rerendering if no values change
  const value = useMemo(() => ({
    loadingTournamentContext,
    tournamentId,
    organiserId,
    overviewData,
    showPrediction,
    setShowPrediction,
  }), [loadingTournamentContext, tournamentId, organiserId, overviewData, showPrediction]);

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

  useEffect(() => {
    const storedShowPrediction = localStorage.getItem("showPrediction");
    if (storedShowPrediction) {
      storedShowPrediction == "true" ? setShowPrediction(true) : setShowPrediction(false)
    }
  }, []);

  return (
    <TournamentContext.Provider value={value}>
      {children}
    </TournamentContext.Provider>
  );
};
