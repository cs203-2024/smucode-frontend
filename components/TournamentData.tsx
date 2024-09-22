"use client"

import TournamentBracketCard from './TournamentBracketCard';
import TournamentWrapper from './TournamentWrapper';
import { TournamentProps } from './types';

// Mock data 
const fetchTournamentData = async (): Promise<TournamentProps> => {

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
              "image": "https://example.com/images/alice.jpg",
              "score": 45
            },
            "playerTwo": {
              "name": "Bob",
              "id": "player2",
              "image": "https://example.com/images/bob.jpg",
              "score": 30
            }
          },
          {
            "id": 2,
            "status": "completed",
            "playerOne": {
              "name": "Charlie",
              "id": "player3",
              "image": "https://example.com/images/charlie.jpg",
              "score": 50
            },
            "playerTwo": {
              "name": "Diana",
              "id": "player4",
              "image": "https://example.com/images/diana.jpg",
              "score": 40
            }
          },
          {
            "id": 3,
            "status": "completed",
            "playerOne": {
              "name": "Eve",
              "id": "player5",
              "image": "https://example.com/images/eve.jpg",
              "score": 60
            },
            "playerTwo": {
              "name": "Frank",
              "id": "player6",
              "image": "https://example.com/images/frank.jpg",
              "score": 55
            }
          },
          {
            "id": 4,
            "status": "completed",
            "playerOne": {
              "name": "Grace",
              "id": "player7",
              "image": "https://example.com/images/grace.jpg",
              "score": 35
            },
            "playerTwo": {
              "name": "Hank",
              "id": "player8",
              "image": "https://example.com/images/hank.jpg",
              "score": 45
            }
          },
          {
            "id": 5,
            "status": "completed",
            "playerOne": {
              "name": "Ivy",
              "id": "player9",
              "image": "https://example.com/images/ivy.jpg",
              "score": 65
            },
            "playerTwo": {
              "name": "Jack",
              "id": "player10",
              "image": "https://example.com/images/jack.jpg",
              "score": 70
            }
          },
          {
            "id": 6,
            "status": "completed",
            "playerOne": {
              "name": "Karen",
              "id": "player11",
              "image": "https://example.com/images/karen.jpg",
              "score": 55
            },
            "playerTwo": {
              "name": "Leo",
              "id": "player12",
              "image": "https://example.com/images/leo.jpg",
              "score": 65
            }
          },
          {
            "id": 7,
            "status": "completed",
            "playerOne": {
              "name": "Mona",
              "id": "player13",
              "image": "https://example.com/images/mona.jpg",
              "score": 75
            },
            "playerTwo": {
              "name": "Nina",
              "id": "player14",
              "image": "https://example.com/images/nina.jpg",
              "score": 60
            }
          },
          {
            "id": 8,
            "status": "completed",
            "playerOne": {
              "name": "Oscar",
              "id": "player15",
              "image": "https://example.com/images/oscar.jpg",
              "score": 80
            },
            "playerTwo": {
              "name": "Paul",
              "id": "player16",
              "image": "https://example.com/images/paul.jpg",
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
              "image": "https://example.com/images/alice.jpg",
              "score": 45
            },
            "playerTwo": {
              "name": "Bob",
              "id": "player2",
              "image": "https://example.com/images/bob.jpg",
              "score": 30
            }
          },
          {
            "id": 2,
            "status": "ongoing",
            "playerOne": {
              "name": "Charlie",
              "id": "player3",
              "image": "https://example.com/images/charlie.jpg",
              "score": 50
            },
            "playerTwo": {
              "name": "Diana",
              "id": "player4",
              "image": "https://example.com/images/diana.jpg",
              "score": 40
            }
          },
          {
            "id": 3,
            "status": "ongoing",
            "playerOne": {
              "name": "Eve",
              "id": "player5",
              "image": "https://example.com/images/eve.jpg",
              "score": 60
            },
            "playerTwo": {
              "name": "Frank",
              "id": "player6",
              "image": "https://example.com/images/frank.jpg",
              "score": 55
            }
          },
          {
            "id": 4,
            "status": "ongoing",
            "playerOne": {
              "name": "Grace",
              "id": "player7",
              "image": "https://example.com/images/grace.jpg",
              "score": 35
            },
            "playerTwo": {
              "name": "Hank",
              "id": "player8",
              "image": "https://example.com/images/hank.jpg",
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
              "image": "https://example.com/images/alice.jpg",
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

const TournamentData: React.FC = async () => {
  const tournamentData = await fetchTournamentData();
  return (
    <div>
      <TournamentWrapper rounds={tournamentData.rounds} />
    </div>
  );
};

export default TournamentData;