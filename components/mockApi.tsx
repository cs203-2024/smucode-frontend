import { TournamentProps, TournamentOverviewProps, ParticipantCardListProp } from "./types";

// const mockTournamentData: TournamentOverviewProps = {
//   id: "1",
//   name: "Summer Coding Challenge 2024",
//   imageUrl: "",
//   startDateTime: "2024-08-15 09:00 AM",
//   endDateTime: "2024-08-20 06:00 PM",
//   signUpStartDateTime: "2024-07-01 12:00 PM",
//   signUpCloseDateTime: "2024-08-10 11:59 PM",
//   signUpStatus: "Open",
//   tournamentStatus: "Upcoming",
//   currentRound: "Not Started",
//   participantsCount: 30,
//   maxParticipants: 32,
//   scoreCriteria: {
//     time: 40,
//     space: 30,
//     testCases: 30,
//   },
//   organizerId: "adminDaddy",
// };

// const mockTournamentBracketsData: TournamentProps = {
//     "rounds": [
//       {
//         "id": "uuid-1",
//         "seqId": 1,
//         "name": "Round of 16",
//         "startDate": "",
//         "endDate": "",
//         "status": "completed",
//         "brackets": [
//           {
//             "id": "uuid-1-1",
//             "seqId": 1,
//             "status": "completed",
//             "playerOne": {
//               "id": "Alice",
//               "image": "",
//               "score": 45
//             },
//             "playerTwo": {
//               "id": "Bob",
//               "image": "",
//               "score": 30
//             },
//             "winner": "Alice"
//           },
//           {
//             "id": "uuid-1-2",
//             "seqId": 2,
//             "status": "completed",
//             "playerOne": {
//               "id": "Charlie",
//               "image": "",
//               "score": 50
//             },
//             "playerTwo": {
//               "id": "Diana",
//               "image": "",
//               "score": 40
//             },
//             "winner": "Charlie"
//           },
//           {
//             "id": "uuid-1-3",
//             "seqId": 3,
//             "status": "completed",
//             "playerOne": {
//               "id": "Eve",
//               "image": "",
//               "score": 60
//             },
//             "playerTwo": {
//               "id": "Frank",
//               "image": "",
//               "score": 55
//             },
//             "winner": "Eve"
//           },
//           {
//             "id": "uuid-1-4",
//             "seqId": 4,
//             "status": "completed",
//             "playerOne": {
//               "id": "Grace",
//               "image": "",
//               "score": 35
//             },
//             "playerTwo": {
//               "id": "Hank",
//               "image": "",
//               "score": 45
//             },
//             "winner": "Hank"
//           },
//           {
//             "id": "uuid-1-5",
//             "seqId": 5,
//             "status": "completed",
//             "playerOne": {
//               "id": "Ivy",
//               "image": "",
//               "score": 65
//             },
//             "playerTwo": {
//               "id": "Jack",
//               "image": "",
//               "score": 70
//             },
//             "winner": "Jack"
//           },
//           {
//             "id": "uuid-1-6",
//             "seqId": 6,
//             "status": "completed",
//             "playerOne": {
//               "id": "Karen",
//               "image": "",
//               "score": 55
//             },
//             "playerTwo": {
//               "id": "Leo",
//               "image": "",
//               "score": 65
//             },
//             "winner": "Leo"
//           },
//           {
//             "id": "uuid-1-7",
//             "seqId": 7,
//             "status": "completed",
//             "playerOne": {
//               "id": "Mona",
//               "image": "",
//               "score": 75
//             },
//             "playerTwo": {
//               "id": "Nina",
//               "image": "",
//               "score": 60
//             },
//             "winner": "Mona"
//           },
//           {
//             "id": "uuid-1-8",
//             "seqId": 8,
//             "status": "completed",
//             "playerOne": {
//               "id": "Oscar",
//               "image": "",
//               "score": 80
//             },
//             "playerTwo": {
//               "id": "Paul",
//               "image": "",
//               "score": 50
//             },
//             "winner": "Oscar"
//           }
//         ]
//       },
//       {
//         "id": "uuid-2",
//         "seqId": 2,
//         "name": "Quarter Finals",
//         "startDate": "",
//         "endDate": "",
//         "status": "ongoing",
//         "brackets": [
//           {
//             "id": "uuid-2-1",
//             "seqId": 1,
//             "status": "completed",
//             "playerOne": {
//               "id": "Alice",
//               "image": "",
//               "score": 45
//             },
//             "playerTwo": {
//               "id": "Bob",
//               "image": "",
//               "score": 30
//             },
//             "winner": "Alice"
//           },
//           {
//             "id": "uuid-2-2",
//             "seqId": 2,
//             "status": "ongoing",
//             "playerOne": {
//               "id": "Charlie",
//               "image": "",
//               "score": 50
//             },
//             "playerTwo": {
//               "id": "Diana",
//               "image": "",
//               "score": 40
//             },
//             "winner": ""
//           },
//           {
//             "id": "uuid-2-3",
//             "seqId": 3,
//             "status": "ongoing",
//             "playerOne": {
//               "id": "Eve",
//               "image": "",
//               "score": 60
//             },
//             "playerTwo": {
//               "id": "Frank",
//               "image": "",
//               "score": 55
//             },
//             "winner": ""
//           },
//           {
//             "id": "uuid-2-4",
//             "seqId": 4,
//             "status": "ongoing",
//             "playerOne": {
//               "id": "Grace",
//               "image": "",
//               "score": 35
//             },
//             "playerTwo": {
//               "id": "Hank",
//               "image": "",
//               "score": 45
//             },
//             "winner": ""
//           }
//         ]
//       },
//       {
//         "id": "uuid-3",
//         "seqId": 3,
//         "name": "Semi Finals",
//         "startDate": "",
//         "endDate": "",
//         "status": "pending",
//         "brackets": [
//           {
//             "id": "uuid-3-1",
//             "seqId": 1,
//             "status": "pending",
//             "playerOne": {
//               "id": "Alice",
//               "image": "",
//               "score": 0
//             },
//             "winner": ""
//           },
//           {
//             "id": "uuid-3-2",
//             "seqId": 2,
//             "status": "pending",
//             "winner": ""
//           }
//         ]
//       },
//       {
//         "id": "uuid-4",
//         "seqId": 4,
//         "name": "Grand Final",
//         "startDate": "",
//         "endDate": "",
//         "status": "pending",
//         "brackets": [
//           {
//             "id": "uuid-4-1",
//             "seqId": 1,
//             "status": "pending",
//             "winner": ""
//           }
//         ]
//       }
//     ]  
// };

const mockParticipantsData: ParticipantCardListProp = {
  participants: [
    { id: "1", name: "John Doe", profilePicture: "", rank: 1, wins: 10, losses: 2 },
    { id: "2", name: "Jane Smith", profilePicture: "", rank: 2, wins: 9, losses: 3 },
    { id: "3", name: "Bob Johnson", profilePicture: "", rank: 3, wins: 8, losses: 4 },
    { id: "4", name: "Alice Brown", profilePicture: "", rank: 4, wins: 7, losses: 5 },
    { id: "5", name: "Charlie Wilson", profilePicture: "", rank: 5, wins: 6, losses: 6 },
    { id: "6", name: "Eva Martinez", profilePicture: "", rank: 6, wins: 5, losses: 7 },
    { id: "7", name: "David Lee", profilePicture: "", rank: 7, wins: 4, losses: 8 },
    { id: "8", name: "Grace Taylor", profilePicture: "", rank: 8, wins: 3, losses: 9 },
  ],
};

// export const fetchTournamentOverviewData = async (id: string | undefined) => {
//   await new Promise((resolve) => setTimeout(resolve, 500));
//   if (id == "1") {
//     return mockTournamentData;
//   }
//   return null;
// };

// export const fetchTournamentBracketsData = async (id: string | undefined) => {
//   await new Promise((resolve) => setTimeout(resolve, 500));
//   if (id == "1") {
//     return mockTournamentBracketsData;
//   }
//   return null;
// };

export const fetchTournamentParticipantsData = async (id: string | undefined) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (id == "1") {
    return mockParticipantsData;
  }
  return null;
};

export const profileUsers = [
  {
    id: "1",
    name: "TheCodingChampion",
    email: "championchallander@gmail.com",
    profilePicture: "/assets/images/profile-picture.jpg",
    elo: 2350,
    eloDate: "2024-09-18",
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
    eloDate: "2024-09-22",
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
    eloDate: "2024-09-16",
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

export const opponents = [
  {
    id: 1,
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    avatar: "/avatars/01.png",
    score: 77,
    date: "2024-09-20",
  },
  {
    id: 2,
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    avatar: "/avatars/02.png",
    score: -39,
    date: "2024-09-18",
  },
  {
    id: 3,
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    avatar: "/avatars/03.png",
    score: 100,
    date: "2024-09-15",
  },
  {
    id: 4,
    name: "William Kim",
    email: "will@email.com",
    avatar: "/avatars/04.png",
    score: -50,
    date: "2024-09-12",
  },
  {
    id: 5,
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    avatar: "/avatars/05.png",
    score: 25,
    date: "2024-09-10",
  },
  {
    id: 6,
    name: "Liam Johnson",
    email: "liam.johnson@email.com",
    avatar: "/avatars/06.png",
    score: 45,
    date: "2024-09-08",
  },
  {
    id: 7,
    name: "Emma Wilson",
    email: "emma.wilson@email.com",
    avatar: "/avatars/07.png",
    score: -20,
    date: "2024-09-05",
  },
  {
    id: 8,
    name: "Noah Brown",
    email: "noah.brown@email.com",
    avatar: "/avatars/08.png",
    score: 60,
    date: "2024-09-03",
  },
  {
    id: 9,
    name: "Ava Taylor",
    email: "ava.taylor@email.com",
    avatar: "/avatars/09.png",
    score: -15,
    date: "2024-09-01",
  },
  {
    id: 10,
    name: "Mason Anderson",
    email: "mason.anderson@email.com",
    avatar: "/avatars/10.png",
    score: 30,
    date: "2024-08-30",
  },
];

// Function to fetch opponents data
export const fetchOpponentsData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate a delay
  return opponents;
};


// export const updateBracketScore = async (
//   roundId: number,
//   bracketId: string,
//   playerOneScore: number,
//   playerTwoScore: number
// ) => {

//   await new Promise((resolve) => setTimeout(resolve, 500));


//   const round = mockTournamentBracketsData.rounds.find((round) => round.id === roundId);
//   if (!round) return { success: false, message: "Round not found" };

//   const bracket = round.brackets.find((bracket) => bracket.id === bracketId);
//   if (!bracket) return { success: false, message: "Bracket not found" };

//   if (bracket.playerOne) bracket.playerOne.score = playerOneScore;
//   if (bracket.playerTwo) bracket.playerTwo.score = playerTwoScore;

//   return { success: true, message: "Bracket score updated successfully" };
// };

// export const endBracket = async (
//   roundId: number,
//   bracketId: string,
//   winner: string
// ) => {

//   await new Promise((resolve) => setTimeout(resolve, 500));


//   const round = mockTournamentBracketsData.rounds.find((round) => round.id === roundId);
//   if (!round) return { success: false, message: "Round not found" };

//   const bracket = round.brackets.find((bracket) => bracket.id === bracketId);
//   if (!bracket) return { success: false, message: "Bracket not found" };

//   bracket.status = "completed";

//   return { success: true, message: "Bracket ended successfully" };
// };
