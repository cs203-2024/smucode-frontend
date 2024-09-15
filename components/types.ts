export type PlayerInfo = {
    name: string;
    id: string;
    image: string;
    score: number;
};

export type BracketProps = {
    id: number;
    playerOne: PlayerInfo;
    playerTwo: PlayerInfo;
};

export type RoundProps = {
    name: string;
    id: number;
    brackets: BracketProps[];
};

export type TournamentCardInfo = {
    name: string;
    id: string;
    ongoing: boolean;
    capacity: number;
    startDate: Date;
    endDate: Date;
};