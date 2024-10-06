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
    id: number;
    icon: string;
    name: string;
    capacity: number;
    format: string;
    band: string;
    startDate: Date;
    endDate: Date;
    signUpDeadline: Date;
    status: string;
    signUpPercentage: number;
    actualSignUp: number;
    timeWeight: number;
    memWeight: number;
    testCaseWeight: number;
    currentRound: string;
    roundEnds: Date;
};

