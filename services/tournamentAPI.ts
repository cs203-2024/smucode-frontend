import axiosClient from './axiosClient';
import { TournamentSignUpInfo, TournamentCardInfo, UserTournamentCardInfo, TournamentProps, TournamentOverviewProps, ParticipantCardListProp, PlayerInfo } from '@/components/types';
import Cookies from "js-cookie";

//interface for tournament
interface Tournament {
    name: string;
    description: string;
    capacity: number;
    format: string;
    band: string;
    startDate: Date;
    endDate: Date;
    signupStartDate: Date;
    signupEndDate: Date;
    status: string;
    timeWeight: number;
    memWeight: number;
    testCaseWeight: number;
    organiser: string;
    icon?: string;//File | undefined;
}

interface CreateTournamentResponse {
    message: string;
    tournamentDTO: Tournament;
    token?: string;
}

interface SignUpInfo {
    username: string;
    tournamentId: string;
}

interface SignUpResponse {
    message: string;
    signUpData: SignUpInfo;
}

export const createTournament = async (tournamentData: Tournament):Promise<Tournament> => {
    try {
        console.log(tournamentData);
        const response = await axiosClient.post<Tournament>(`/tournaments/create`, tournamentData);
        return response.data;
    } catch (error) {
        console.error('Error creating tournament:', error);
        throw error;
    }
}

export const signUpForTournament = async (data: TournamentSignUpInfo):Promise<SignUpResponse> => {
    try {
        const response = await axiosClient.post<SignUpResponse>(`/tournaments/${data.tournamentId}/signup?user=${data.username}`); 
        return response.data;
    } catch (error) {
        console.error("Error signing up for tournament:", error);
        throw error;
    }
}

export const removeSignUpForTournament = async (data: TournamentSignUpInfo):Promise<SignUpResponse> => {
    try {
        const response = await axiosClient.delete<SignUpResponse>(`/tournaments/${data.tournamentId}/signup?user=${data.username}`); 
        console.log(`changed ${data.tournamentId}, ${data.username}`);
        return response.data;
    } catch (error) {
        console.error("Error signing up for tournament:", error);
        throw error;
    }
}

export const getAllTournamentsCreatedByAdmin = async (username: string):Promise<TournamentCardInfo[]> => {
    try {
        // const response = await axiosClient.get<TournamentCardInfo[]>(`/tournaments?username=admin`);
        const response = await axiosClient.get<TournamentCardInfo[]>(`/tournaments?username=${username}`); 
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error retrieving tournaments created by admin:", error);
        throw error;
    } 
}

export const getAllTournamentsForUser = async (username: string):Promise<UserTournamentCardInfo[]> => {
    try {
         const response = await axiosClient.get<UserTournamentCardInfo[]>(`/tournaments?username=`);
        //const response = await axiosClient.get<UserTournamentCardInfo[]>(`/tournaments?username=${username}`); 
        return response.data;
    } catch (error) {
        console.error("Error retrieving tournaments for user:", error);
        throw error;
    } 
}

export const fetchTournamentOverviewData = async (id: string | undefined):Promise<TournamentOverviewProps | null> => {
    if(!id){
        return null;
    }
    try {
        const response = await axiosClient.get<TournamentOverviewProps>(`/tournaments/${id}`); 
        return response.data;
    } catch (error) {
        console.error("Error retrieving tournament overview:", error);
        throw error;
    } 
  };
  
export const fetchTournamentBracketsData = async (id: string | undefined):Promise<TournamentProps | null> => {
    if(!id){
        return null;
    }
    try {
        const response = await axiosClient.get<TournamentProps>(`/tournaments/${id}/brackets`); 
        return response.data;
    } catch (error) {
        console.error("Error retrieving tournament brackets:", error);
        throw error;
    } 
};

export const fetchTournamentParticipantsData = async (id: string):Promise<ParticipantCardListProp> => {
    try {
        const response = await axiosClient.get<ParticipantCardListProp>(`/tournaments/participants?id=${id}`); 
        return response.data;
    } catch (error) {
        console.error("Error retrieving tournament participants:", error);
        throw error;
    } 
};

export const updateBracketScore = async (
    id: string,
    playerOne: PlayerInfo,
    playerTwo: PlayerInfo
  ): Promise<string> => {
    try {
      const payload = {
        playerOne: {
          id: playerOne.id,
          score: playerOne.score
        },
        playerTwo: {
          id: playerTwo.id,
          score: playerTwo.score
        }
      };

      const response = await axiosClient.put<string>(`/brackets/${id}`, payload);
  
      return response.data;
    } catch (error) {
      console.error("Error updating bracket:", error);
      throw error;
    }
  };

export const endBracket = async (
    id: string,
    updateWinner: string | undefined
    ): Promise<string> => {
    try {
        const payload = {
          winner: updateWinner
        };

    const response = await axiosClient.put<string>(`/brackets/${id}`, payload);
      
    return response.data;

    } catch (error) {
     console.error("Error ending bracket:", error);
     throw error;
    }
};

export const endRound = async (
    id: string | undefined,
    ): Promise<string> => {
    try {

    const response = await axiosClient.put<string>(`/tournaments/${id}/progress`);
      
    return response.data;

    } catch (error) {
     console.error("Error ending round:", error);
     throw error;
    }
};