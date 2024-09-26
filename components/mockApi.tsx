
import { TournamentProps } from './types';

// Mock API to fetch tournament data
export const fetchTournamentData = async (): Promise<TournamentProps> => {
  return {
    "rounds": [
      {
        "id": 1,
        "name": "Round of 16",
        "brackets": [
          {
            "id": 1,
            "status": "completed",
            "playerOne": {
              "name": "Alice",
              "id": "player1",
              "image": "",
              "score": 45
            },
            "playerTwo": {
              "name": "Bob",
              "id": "player2",
              "image": "",
              "score": 30
            }
          },
          {
            "id": 2,
            "status": "completed",
            "playerOne": {
              "name": "Charlie",
              "id": "player3",
              "image": "",
              "score": 50
            },
            "playerTwo": {
              "name": "Diana",
              "id": "player4",
              "image": "",
              "score": 40
            }
          },
          {
            "id": 3,
            "status": "completed",
            "playerOne": {
              "name": "Eve",
              "id": "player5",
              "image": "",
              "score": 60
            },
            "playerTwo": {
              "name": "Frank",
              "id": "player6",
              "image": "",
              "score": 55
            }
          },
          {
            "id": 4,
            "status": "completed",
            "playerOne": {
              "name": "Grace",
              "id": "player7",
              "image": "",
              "score": 35
            },
            "playerTwo": {
              "name": "Hank",
              "id": "player8",
              "image": "",
              "score": 45
            }
          },
          {
            "id": 5,
            "status": "completed",
            "playerOne": {
              "name": "Ivy",
              "id": "player9",
              "image": "",
              "score": 65
            },
            "playerTwo": {
              "name": "Jack",
              "id": "player10",
              "image": "",
              "score": 70
            }
          },
          {
            "id": 6,
            "status": "completed",
            "playerOne": {
              "name": "Karen",
              "id": "player11",
              "image": "",
              "score": 55
            },
            "playerTwo": {
              "name": "Leo",
              "id": "player12",
              "image": "",
              "score": 65
            }
          },
          {
            "id": 7,
            "status": "completed",
            "playerOne": {
              "name": "Mona",
              "id": "player13",
              "image": "",
              "score": 75
            },
            "playerTwo": {
              "name": "Nina",
              "id": "player14",
              "image": "",
              "score": 60
            }
          },
          {
            "id": 8,
            "status": "completed",
            "playerOne": {
              "name": "Oscar",
              "id": "player15",
              "image": "",
              "score": 80
            },
            "playerTwo": {
              "name": "Paul",
              "id": "player16",
              "image": "",
              "score": 50
            }
          }
        ]
      },
      {
        "id": 2,
        "name": "Quarter Finals",
        "brackets": [
          {
            "id": 1,
            "status": "completed",
            "playerOne": {
              "name": "Alice",
              "id": "player1",
              "image": "",
              "score": 45
            },
            "playerTwo": {
              "name": "Bob",
              "id": "player2",
              "image": "",
              "score": 30
            }
          },
          {
            "id": 2,
            "status": "ongoing",
            "playerOne": {
              "name": "Charlie",
              "id": "player3",
              "image": "",
              "score": 50
            },
            "playerTwo": {
              "name": "Diana",
              "id": "player4",
              "image": "",
              "score": 40
            }
          },
          {
            "id": 3,
            "status": "ongoing",
            "playerOne": {
              "name": "Eve",
              "id": "player5",
              "image": "",
              "score": 60
            },
            "playerTwo": {
              "name": "Frank",
              "id": "player6",
              "image": "",
              "score": 55
            }
          },
          {
            "id": 4,
            "status": "ongoing",
            "playerOne": {
              "name": "Grace",
              "id": "player7",
              "image": "",
              "score": 35
            },
            "playerTwo": {
              "name": "Hank",
              "id": "player8",
              "image": "",
              "score": 45
            }
          }
        ]
      },
      {
        "id": 3,
        "name": "Semi Finals",
        "brackets": [
          {
            "id": 1,
            "status": "pending",
            "playerOne": {
              "name": "Alice",
              "id": "player1",
              "image": "",
              "score": 0
            },
          },
          {
            "id": 2,
            "status": "pending"
          }
        ]
      },
      {
        "id": 4,
        "name": "Grand Final",
        "brackets": [
          {
            "id": 1,
            "status": "pending"
          }
        ]
      }
    ]
  };
};