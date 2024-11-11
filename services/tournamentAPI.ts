import axiosClient from './axiosClient';
import { TournamentSignUpInfo, TournamentCardInfo, UserTournamentCardInfo, TournamentProps, TournamentOverviewProps, ParticipantCardListProp, PlayerInfo, UploadLinkResponse, UploadSuccessResponse } from '@/components/types';

//interface for tournament
export interface Tournament {
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
    id: string;
    name: string;
    description: string;
    capacity: number;
    format: string;
    band: string;
    startDate: string;
    endDate: string;
    signupStartDate: string;
    signupEndDate: string;
    status: string;
    timeWeight: number;
    memWeight: number;
    testCaseWeight: number;
    organiser: string;
    icon: string;
    currentRound: string;
    signups: string[];
}

interface SignUpInfo {
    username: string;
    tournamentId: string;
}

interface SignUpResponse {
    message: string;
    signUpData: SignUpInfo;
}

export const createTournament = async (tournamentData: Tournament):Promise<CreateTournamentResponse> => {
    try {
        console.log(tournamentData);
        const response = await axiosClient.post<CreateTournamentResponse>(`/tournaments/create`, tournamentData);
        return response.data;
    } catch (error) {
        console.error('Error creating tournament:', error);
        throw error;
    }
}

export const signUpForTournament = async (tournamentId: string):Promise<SignUpResponse> => {
    try {
        const response = await axiosClient.post<SignUpResponse>(`/tournaments/${tournamentId}/signup`); 
        return response.data;
    } catch (error) {
        console.error("Error signing up for tournament:", error);
        throw error;
    }
}

export const removeSignUpForTournament = async (tournamentId: string):Promise<SignUpResponse> => {
    try {
        const response = await axiosClient.delete<SignUpResponse>(`/tournaments/${tournamentId}/signup`); 
        //console.log(`changed ${data.tournamentId}, ${data.username}`);
        return response.data;
    } catch (error) {
        console.error("Error signing up for tournament:", error);
        throw error;
    }
}

export const leaveOngoingTournament = async (tournamentId: string):Promise<SignUpResponse> => {
    try {
        const response = await axiosClient.patch<SignUpResponse>(`/tournaments/${tournamentId}/leave`); 
        return response.data;
    } catch (error) {
        console.error("Error leaving tournament:", error);
        throw error;
    }
}

export const getAllTournamentsCreatedByAdmin = async ():Promise<TournamentCardInfo[]> => {
    try {
        // const response = await axiosClient.get<TournamentCardInfo[]>(`/tournaments?username=admin`);
        //const response = await axiosClient.get<TournamentCardInfo[]>(`/tournaments?username=${username}`); 
        const response = await axiosClient.get<TournamentCardInfo[]>(`/tournaments`); 
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error retrieving tournaments created by admin:", error);
        throw error;
    } 
}

export const getAllTournamentsForUser = async ():Promise<UserTournamentCardInfo[]> => {
    try {
        //const response = await axiosClient.get<UserTournamentCardInfo[]>(`/tournaments?username=`);
        const response = await axiosClient.get<UserTournamentCardInfo[]>(`/tournaments`); 
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

export const fetchTournamentParticipantsData = async (id: string | undefined):Promise<ParticipantCardListProp> => {
    try {
        const response = await axiosClient.get<ParticipantCardListProp>(`/tournaments/${id}/participants`); 
        return response.data;
    } catch (error) {
        console.error("Error retrieving tournament participants:", error);
        throw error;
    } 
};

export const updateBracketScore = async (
    id: string,
    player1: PlayerInfo,
    player2: PlayerInfo
  ): Promise<string> => {
    try {
      const payload = {
        player1: {
          id: player1.username,
          score: player1.score
        },
        player2: {
          id: player2.username,
          score: player2.score
        }
      };

      const response = await axiosClient.put<string>(`/tournaments/brackets/${id}`, payload);
  
      return response.data;
    } catch (error) {
      console.error("Error updating bracket:", error);
      throw error;
    }
  };

export const endBracket = async (
    id: string
    ): Promise<string> => {
    try {
        
    const response = await axiosClient.put<string>(`/tournaments/brackets/${id}/end`);
      
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

    const response = await axiosClient.put<string>(`/tournaments/rounds/${id}/end`);
      
    return response.data;

    } catch (error) {
     console.error("Error ending round:", error);
     throw error;
    }
};

export const updateRoundDetails = async (
    id: string | undefined,
    updateRoundName: String,
    updateStartDate: Date,
    updateEndDate: Date
    ): Promise<string> => {
    try {
    const payload = {
        name: updateRoundName,
        startDate: updateStartDate,
        endDate: updateEndDate
    }
    const response = await axiosClient.put<string>(`/tournaments/rounds/${id}`, payload);
      
    return response.data;

    } catch (error) {
     console.error("Error updating round:", error);
     throw error;
    }
};

export const getAllAvailableTournamentsForExplore = async ():Promise<UserTournamentCardInfo[]> => {
    try {
        // const response = await axiosClient.get<TournamentCardInfo[]>(`/tournaments?username=admin`);
        const response = await axiosClient.get<UserTournamentCardInfo[]>(`/tournaments/explore`); 
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error retrieving tournaments for explore:", error);
        throw error;
    } 
}

export const getTournamentImageUploadLink = async (tournamentId: string, type: string):Promise<UploadLinkResponse> => {
    try {
      const response = await axiosClient.post<UploadLinkResponse>(`/tournaments/get-upload-link?tournamentId=${tournamentId}&contentType=${type}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching get-upload-link:", error);
      throw error;
    }
  }
  
  export const uploadTournamentImage = async(tournamentId: string, key: string):Promise<UploadSuccessResponse> => {
    try {
      const response = await axiosClient.post<UploadSuccessResponse>(`/tournaments/upload-picture?tournamentId=${tournamentId}&key=${key}`);
      return response.data;
    } catch (error) {
      console.error("Error posting to upload-picture:", error);
      throw error;
    }
  }