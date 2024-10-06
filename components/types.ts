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

// export type User = {
//     username: string;
//     image: string;
//   }
export interface User {
    username: string;
    email: string;
    profileImageUrl: string | null;
    role: string;
    mu: number;
    sigma: number;
    skillIndex: number;
}

export interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    // loading: boolean;
    // login: () => Promise<void>;
    logout: () => Promise<void>;
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

  // For testing the profile page
  export interface UserStats {
    id: string;
    name: string;
    email: string;
    profilePicture: string;
    location: string;
    memberSince: string;
    elo: number;
    eloDate: string;
    matchesPlayed: number;
    wins: number;
    losses: number;
  }