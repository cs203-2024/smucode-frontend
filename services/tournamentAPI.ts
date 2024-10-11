import axiosClient from './http';
import { TournamentSignUpInfo, TournamentCardInfo, UserTournamentCardInfo } from '@/components/types';
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
    signUpStartDate: Date;
    signUpEndDate: Date;
    status: string;
    timeWeight: number;
    memWeight: number;
    testCaseWeight: number;
    owner: string;
    icon?: File | undefined;
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
        const response = await axiosClient.get<TournamentCardInfo[]>(`/tournaments?id=${username}`); 
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