import axiosClient from './http';
import { TournamentSignUpInfo, TournamentCardInfo, UserTournamentCardInfo, TournamentProps, TournamentOverviewProps, ParticipantCardListProp } from '@/components/types';
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
    owner: string;
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
        return response.data;
    } catch (error) {
        console.error("Error signing up for tournament:", error);
        throw error;
    }
}

export const getAllTournamentsCreatedByAdmin = async (username: string):Promise<TournamentCardInfo[]> => {
    try {
        // const response = await axiosClient.get<TournamentCardInfo[]>(`/tournaments?id=`);
        const response = await axiosClient.get<TournamentCardInfo[]>(`/tournaments?id=${username}`); 
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error retrieving tournaments created by admin:", error);
        throw error;
    } 
}

export const getAllTournamentsForUser = async (username: string):Promise<UserTournamentCardInfo[]> => {
    try {
        const response = await axiosClient.get<UserTournamentCardInfo[]>(`/tournaments?id=${username}`); 
        return response.data;
    } catch (error) {
        console.error("Error retrieving tournaments for user:", error);
        throw error;
    } 
}

export const fetchTournamentOverviewData = async (id: string):Promise<TournamentOverviewProps> => {
    try {
        const response = await axiosClient.get<TournamentOverviewProps>(`/tournaments/overview?id=${id}`); 
        return response.data;
    } catch (error) {
        console.error("Error retrieving tournament overview:", error);
        throw error;
    } 
  };
  
export const fetchTournamentBracketsData = async (id: string):Promise<TournamentProps> => {
    try {
        const response = await axiosClient.get<TournamentProps>(`/tournaments/brackets?id=${id}`); 
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

export const fetchTournamentOrganizerId = async (id: string):Promise<string> => {
    try {
        const response = await axiosClient.get<string>(`/tournaments/organizer?id=${id}`); 
        return response.data;
    } catch (error) {
        console.error("Error retrieving tournament organizer:", error);
        throw error;
    } 
};

export const updateBracketScore = async (
    roundId: number,
    bracketId: number,
    playerOneScore: number,
    playerTwoScore: number
  ):Promise<string> => {
    try {
        const response = await axiosClient.put<string>(`/tournaments/update?roundId=${roundId}&bracketId=${bracketId}&p1=${playerOneScore}&p2=${playerTwoScore}`); 
        return response.data;
    } catch (error) {
        console.error("Error updating bracket:", error);
        throw error;
    } 
};

export const endBracket = async (
    roundId: number,
    bracketId: number,
  ):Promise<string> => {
    try {
        const response = await axiosClient.post<string>(`/tournaments/end?roundId=${roundId}&bracketId=${bracketId}`); 
        return response.data;
    } catch (error) {
        console.error("Error ending bracket:", error);
        throw error;
    } 
};