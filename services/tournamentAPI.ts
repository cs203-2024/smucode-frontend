import axiosClient from './http';
import { User } from '@/components/types';
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
    signUpDeadline: Date;
    status: string;
    timeWeight: number;
    memWeight: number;
    testCaseWeight: number;
    //icon: File | undefined;
}

interface CreateTournamentResponse {
    message: string;
    tournamentDTO: Tournament;
    token?: string;
}

interface SignUpInfo {
    userId: string;
    tournamentId: string;
}

interface SignUpResponse {
    message: string;
    signUpData: SignUpInfo;
}

export const createTournament = async (tournamentData: Tournament):Promise<Tournament> => {
    try {
        const response = await axiosClient.post<Tournament>(`/tournaments/create`);
        return response.data;
    } catch (error) {
        console.error('Error creating tournament:', error);
        throw error;
    }
}

export const signUpForTournament = async (data: SignUpInfo):Promise<SignUpResponse> => {
    try {
        const response = await axiosClient.post<SignUpResponse>('/tournaments/signup');
        return response.data;
    } catch (error) {
        console.error("Error signing up for tournament");
        throw error;
    }
}

export const removeSignUpForTournament = async () => {
    
}