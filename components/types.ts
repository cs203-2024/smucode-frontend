export type PlayerInfo = {
    name: string;
    id: string;
    image: string;
    score: number;
};

export type BracketProps = {
    id: number;
    status: string;
    playerOne?: PlayerInfo;
    playerTwo?: PlayerInfo;
};

export type RoundProps = {
    name: string;
    id: number;
    brackets: BracketProps[];
};

export type TournamentProps = {
    rounds: RoundProps[];
};

export type User = {
    username: string;
    image: string;
  }
  
export type UserContextType = {
    user: User | null;
    loading: boolean;
    login: () => void;
    logout: () => void;
  }

export type TournamentCardInfo = {
    name: string;
    id: string;
    ongoing: boolean;
    capacity: number;
    startDate: Date;
    endDate: Date;
};

export interface TournamentOverviewProps {
    id: string;
    imageUrl: string;
    name: string;
    startDateTime: string;
    endDateTime: string;
    signUpStartDateTime: string;
    signUpCloseDateTime: string;
    signUpStatus: 'Open' | 'Closed';
    tournamentStatus: 'Upcoming' | 'Ongoing' | 'Completed';
    currentRound?: string;
    participantsCount: number;
    maxParticipants: number;
    scoreCriteria: {
      time: number;
      space: number;
      testCases: number;
    };
  }

  export interface UserStats {
    id: string;
    name: string;
    email: string;
    profilePicture: string;
    elo: number;
    matchesPlayed: number;
    wins: number;
    losses: number;
  }