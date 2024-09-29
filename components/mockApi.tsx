import { TournamentProps, TournamentOverviewProps } from "./types";

const mockTournamentData: TournamentOverviewProps = {
  id: "1",
  name: "Summer Coding Challenge 2024",
  imageUrl: "",
  startDateTime: "2024-08-15 09:00 AM",
  endDateTime: "2024-08-20 06:00 PM",
  signUpStartDateTime: "2024-07-01 12:00 PM",
  signUpCloseDateTime: "2024-08-10 11:59 PM",
  signUpStatus: "Open",
  tournamentStatus: "Upcoming",
  currentRound: "Not Started",
  participantsCount: 30,
  maxParticipants: 32,
  scoreCriteria: {
    time: 40,
    space: 30,
    testCases: 30,
  },
};

const mockTournamentBracketsData: TournamentProps = {
  rounds: [
    {
      id: 1,
      name: "Round of 16",
      brackets: [
        {
          id: 1,
          status: "completed",
          playerOne: {
            name: "Alice",
            id: "player1",
            image: "",
            score: 45,
          },
          playerTwo: {
            name: "Bob",
            id: "player2",
            image: "",
            score: 30,
          },
        },
        {
          id: 2,
          status: "completed",
          playerOne: {
            name: "Charlie",
            id: "player3",
            image: "",
            score: 50,
          },
          playerTwo: {
            name: "Diana",
            id: "player4",
            image: "",
            score: 40,
          },
        },
        {
          id: 3,
          status: "completed",
          playerOne: {
            name: "Eve",
            id: "player5",
            image: "",
            score: 60,
          },
          playerTwo: {
            name: "Frank",
            id: "player6",
            image: "",
            score: 55,
          },
        },
        {
          id: 4,
          status: "completed",
          playerOne: {
            name: "Grace",
            id: "player7",
            image: "",
            score: 35,
          },
          playerTwo: {
            name: "Hank",
            id: "player8",
            image: "",
            score: 45,
          },
        },
        {
          id: 5,
          status: "completed",
          playerOne: {
            name: "Ivy",
            id: "player9",
            image: "",
            score: 65,
          },
          playerTwo: {
            name: "Jack",
            id: "player10",
            image: "",
            score: 70,
          },
        },
        {
          id: 6,
          status: "completed",
          playerOne: {
            name: "Karen",
            id: "player11",
            image: "",
            score: 55,
          },
          playerTwo: {
            name: "Leo",
            id: "player12",
            image: "",
            score: 65,
          },
        },
        {
          id: 7,
          status: "completed",
          playerOne: {
            name: "Mona",
            id: "player13",
            image: "",
            score: 75,
          },
          playerTwo: {
            name: "Nina",
            id: "player14",
            image: "",
            score: 60,
          },
        },
        {
          id: 8,
          status: "completed",
          playerOne: {
            name: "Oscar",
            id: "player15",
            image: "",
            score: 80,
          },
          playerTwo: {
            name: "Paul",
            id: "player16",
            image: "",
            score: 50,
          },
        },
      ],
    },
    {
      id: 2,
      name: "Quarter Finals",
      brackets: [
        {
          id: 1,
          status: "completed",
          playerOne: {
            name: "Alice",
            id: "player1",
            image: "",
            score: 45,
          },
          playerTwo: {
            name: "Bob",
            id: "player2",
            image: "",
            score: 30,
          },
        },
        {
          id: 2,
          status: "ongoing",
          playerOne: {
            name: "Charlie",
            id: "player3",
            image: "",
            score: 50,
          },
          playerTwo: {
            name: "Diana",
            id: "player4",
            image: "",
            score: 40,
          },
        },
        {
          id: 3,
          status: "ongoing",
          playerOne: {
            name: "Eve",
            id: "player5",
            image: "",
            score: 60,
          },
          playerTwo: {
            name: "Frank",
            id: "player6",
            image: "",
            score: 55,
          },
        },
        {
          id: 4,
          status: "ongoing",
          playerOne: {
            name: "Grace",
            id: "player7",
            image: "",
            score: 35,
          },
          playerTwo: {
            name: "Hank",
            id: "player8",
            image: "",
            score: 45,
          },
        },
      ],
    },
    {
      id: 3,
      name: "Semi Finals",
      brackets: [
        {
          id: 1,
          status: "pending",
          playerOne: {
            name: "Alice",
            id: "player1",
            image: "",
            score: 0,
          },
        },
        {
          id: 2,
          status: "pending",
        },
      ],
    },
    {
      id: 4,
      name: "Grand Final",
      brackets: [
        {
          id: 1,
          status: "pending",
        },
      ],
    },
  ],
};

export const fetchTournamentOverviewData = async (id: string | undefined) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (id == "1") {
    return mockTournamentData;
  }
  return null;
};

export const fetchTournamentBracketsData = async (id: string | undefined) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (id == "1") {
    return mockTournamentBracketsData;
  }
  return null;
};

export const profileUsers = [
  {
    id: "1",
    name: "AdrianLooLovesCoding",
    email: "adrianloo@gmail.com",
    profilePicture: "/profile-picture.jpg",
    elo: 2350,
    matchesPlayed: 256,
    wins: 154,
    losses: 102,
    //   recentOpponents: ['Opponent 1', 'Opponent 2', 'Opponent 3'],
  },
  {
    id: "2",
    name: "JohnDoe",
    email: "johndoe@example.com",
    profilePicture: "/profile-picture2.jpg",
    elo: 2000,
    matchesPlayed: 150,
    wins: 100,
    losses: 50,
    //   recentOpponents: ['Opponent 4', 'Opponent 5', 'Opponent 6'],
  },
  {
    id: "3",
    name: "JaneDoe",
    email: "janedoe@example.com",
    profilePicture: "/profile-picture3.jpg",
    elo: 2500,
    matchesPlayed: 300,
    wins: 200,
    losses: 100,
    //   recentOpponents: ['Opponent 7', 'Opponent 8', 'Opponent 9'],
  },
];

// Function to fetch user data based on ID
export const fetchUserData = async (id: string | undefined) => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate a delay
  const user = profileUsers.find((user) => user.id === id);
  return user || null;
};
