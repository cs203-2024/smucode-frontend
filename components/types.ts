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
    id: number;
    icon: string;
    name: string;
    capacity: number;
    format: string;
    band: string;
    startDate: Date;
    endDate: Date;
    signUpStartDate: Date;
    signUpEndDate: Date;
    status: string;
    signUpPercentage: number; // actualSignUp/capcity, computed from backend
    actualSignUp: number; // derived from signup entity computed from backend
    timeWeight: number;
    memWeight: number;
    testCaseWeight: number;
    currentRound: string; // sname of current round
    roundEnds: Date; //datetime of when current round ends
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
    organizerId: string;
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

export type UserTournamentCardInfo = {
    id: number;
    icon: string;
    name: string;
    capacity: number;
    format: string;
    band: string;
    startDate: Date;
    endDate: Date;
    signUpStartDate: Date;
    signUpEndDate: Date;
    status: string;
    signUpPercentage: number;
    actualSignUp: number;
    timeWeight: number;
    memWeight: number;
    testCaseWeight: number;
    currentRound: string; // sname of current round
    roundEnds: Date; //datetime of when current round ends
    signedUp: boolean; // true if user signed up for tournament
    participated: boolean; // true if user is actual participant in tournament
    signUpsOpen: boolean; // derived from backend attributes
    placing: number; // -1 if tournament incomplete, actual placing number otherwise (1 - number of players)
}

export type TournamentSignUpInfo = {
    username: string;
    tournamentId: number;
}
