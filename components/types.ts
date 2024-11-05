import UserDashboardTournamentCard from "./dashboard/UserDashboardTournamentCard";

export type PlayerInfo = {
    username: string;
    image: string;
    score: number;
};

export type BracketProps = {
    id: string;
    seqId: number;
    status: string;
    player1?: PlayerInfo;
    player2?: PlayerInfo;
    winner?: string;
};

export type RoundProps = {
    id: string;
    seqId: number;
    name: string;
    startDateTime: string;
    endDateTime: string;
    status: string;
    brackets: BracketProps[];
};

export type TournamentProps = {
    rounds: RoundProps[];
};

// export type User = {
//     username: string;
//     image: string;
//   }

export type User = {
    username: string;
    email: string;
    profileImageUrl: string | null;
    role: string;
    mu: number;
    sigma: number;
    skillIndex: number;
}

// export type UserContextType = {
//     email: string;
//     profileImageUrl: string | null;
//     role: string;
//     mu: number;
//     sigma: number;
//     skillIndex: number;
// }

export interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    // loading: boolean;
    // login: () => Promise<void>;
    logout: () => Promise<void>;
}

export type TournamentCardInfo = {
    id: string;
    icon: string;
    name: string;
    capacity: number;
    format: string;
    band: string;
    startDate: string;
    endDate: string;
    signupStartDate: string;
    signupEndDate: string;
    status: string;
    signUpPercentage: number; // numberOfSignups/capcity, computed from backend
    numberOfSignups: number; // derived from signup entity computed from backend
    timeWeight: number;
    memWeight: number;
    testCaseWeight: number;
    currentRound: string; // sname of current round
    currentRoundEndDate: string; //datetime of when current round ends
    signupsOpen: boolean; // derived from backend attributes
};

export interface TournamentOverviewProps {
    id: string;
    icon?: string;
    name: string;
    capacity: number;  //to edit from maxParticipants
    description: string;
    format: string;
    band?: string;
    startDate: string; 
    endDate: string;
    signupStartDate: string;
    signupEndDate: string;
    status: 'UPCOMING' | 'ONGOING' | 'COMPLETED';
    signUpStatus?: 'OPEN' | 'CLOSED';
    organiser: string;
    numberOfSignups: number;
    currentRound?: string;
    currentRoundEndDate?: string;
    participantsCount?: number;
    scoreCriteria?: {
      time: number;
      space: number;
      testCases: number;
    };
    signedUp?: boolean;
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


  export type ParticipantCardListProp = {
    participants: Participant[];
  };

  export type Participant = {
    id: string;
    name: string;
    profilePicture: string;
    rank: number;
    wins: number;
    losses: number;
  };

  export type ParticipantCardProps = {
    participants: Participant;
    viewMode: 'grid' | 'list';
  };

  export type ParticipantCardListProp = {
    participants: Participants
  };

export type UserTournamentCardInfo = {
    id: string;
    icon: string;
    name: string;
    capacity: number;
    format: string;
    band: string;
    startDate: string;
    endDate: string;
    signupStartDate: string;
    signupEndDate: string;
    status: string;
    signUpPercentage: number;
    numberOfSignups: number;
    timeWeight: number;
    memWeight: number;
    testCaseWeight: number;
    currentRound: string; // sname of current round
    currentRoundEndDate: string; //datetime of when current round ends
    signedUp: boolean; // true if user signed up for tournament
    participated: boolean; // true if user is actual participant in tournament
    signupsOpen: boolean; // derived from backend attributes
    placing: number; // -1 if tournament incomplete, actual placing number otherwise (1 - number of players)
}

export type TournamentSignUpInfo = {
    username: string;
    tournamentId: string;
}

export type UserDashboardTournamentCardInfo = {
  id: string;
  icon: string;
  name: string;
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
  currentRound: string; // sname of current round
  currentRoundEndDate: string; //datetime of when current round ends
  signedUp: boolean; // true if user signed up for tournament
  participated: boolean; // true if user is actual participant in tournament
  signupsOpen: boolean; // derived from backend attributes
  placing: number; // -1 if tournament incomplete, actual placing number otherwise (1 - number of players)
}

export type NotificationCardInfo = {
  id: string;
  tournamentId: string;
  tournamentName: string;
  message: string;
  type: string; // NotificationType 
  category: string;
  createdAt: string;
  isRead: boolean;
}

export type NotificationData = {
  id: string;
  username: string;
  tournamentId: string;
  tournamentName: string;
  message: string;
  type: string; // Add more specific types if needed
  category: string;
  createdAt: string; // ISO date string
  isRead: boolean;
};