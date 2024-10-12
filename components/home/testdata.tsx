export const notificationData = [
    {
        "id": 1,
        "category": "alert",
        "message": "Unusual Behaviour Detected",
        "description": "1 match has been flagged for suspicious performance behaviour by its participants.",
        "datetime": new Date(),
        "tournament": {
            "id": 1,
            "name": "SMU Gardening Championships"
        },
        "read": false
    },
    {
        "id": 2,
        "category": "issue",
        "message": "Result Approval Required",
        "description": "Quarter-Finals round has concluded. 4 games are awaiting your approval of their results.",
        "datetime": new Date(),
        "tournament": {
            "id": 1,
            "name": "SMU Gardening Championships"
        },
        "read": false
    },
    {
        "id": 3,
        "category": "notification",
        "message": "Cron Job Started",
        "description": "Tournament has commenced - started by Cron Job at 18:00",
        "datetime": new Date(),
        "tournament": {
            "id": 1,
            "name": "SMU Gardening Championships"
        },        
        "read": true
    },
    {
        "id": 4,
        "category": "notification",
        "message": "Test Message",
        "description": "This is some text that is supposed to be very long to check if the line clamp function works properly because I cannot think of any other way to test this functionality.",
        "datetime": new Date(),
        "tournament": {
            "id": 1,
            "name": "SMU Gardening Championships"
        },        
        "read": true
    },
]

export const tournamentCardData = [
    {
        "id": 1,
        "icon": "smu-logo.png",
        "name": "SMU Gardening Championships",
        "format": "single-elimination",
        "band": "upper",
        "startDate": new Date(),
        "endDate": new Date(),
        "signupEndDate": new Date(),
        "status": "ongoing",
        "signUpPercentage": 60,
        "numberOfSignups": 38,
        "capacity": 64,
        "timeWeight": 30,
        "memWeight": 20,
        "testCaseWeight": 50,
        "currentRound": "Quarter-Finals",
        "currentRoundEndDate": new Date("2024-12-17T03:24:00"),
    },
    {
        "id": 2,
        "icon": "smu-logo.png",
        "name": "SMU Gardening Championships",
        "format": "double-elimination",
        "band": "upper",
        "startDate": new Date(),
        "endDate": new Date(),
        "signupEndDate": new Date(),
        "status": "ongoing",
        "signUpPercentage": 60,
        "numberOfSignups": 38,
        "capacity": 64,
        "timeWeight": 40,
        "memWeight": 15,
        "testCaseWeight": 45,
        "currentRound": "Quarter-Finals",
        "currentRoundEndDate": new Date("2024-10-17T03:24:00"),
    },
    {
        "id": 3,
        "icon": "smu-logo.png",
        "name": "SMU Gardening Championships",
        "format": "single-elimination",
        "band": "middle",
        "startDate": new Date(),
        "endDate": new Date(),
        "signupEndDate": new Date(),
        "status": "completed",
        "signUpPercentage": 30,
        "numberOfSignups": 10,
        "capacity": 32,
        "timeWeight": 69,
        "memWeight": 31,
        "testCaseWeight": 0,
        "currentRound": "Final",
        "currentRoundEndDate": new Date("2023-12-17T03:24:00"),
    },
    {
        "id": 4,
        "icon": "smu-logo.png",
        "name": "SMU Gardening Championships",
        "format": "single-elimination",
        "band": "upper",
        "startDate": new Date(),
        "endDate": new Date(),
        "signupEndDate": new Date(),
        "status": "ongoing",
        "signUpPercentage": 85,
        "numberOfSignups": 13,
        "capacity": 16,
        "timeWeight": 50,
        "memWeight": 35,
        "testCaseWeight": 15,
        "currentRound": "Quarter-Finals",
        "currentRoundEndDate": new Date("2024-11-17T03:24:00"),
    },
    {
        "id": 5,
        "icon": "smu-logo.png",
        "name": "SMU Gardening Championships",
        "format": "single-elimination",
        "band": "lower",
        "startDate": new Date(),
        "endDate": new Date(),
        "signupEndDate": new Date(),
        "status": "completed",
        "signUpPercentage": 50,
        "numberOfSignups": 32,
        "capacity": 64,
        "timeWeight": 40,
        "memWeight": 0,
        "testCaseWeight": 60,
        "currentRound": "Grand Finals",
        "currentRoundEndDate": new Date("2024-06-17T03:24:00"),
    },
    {
        "id": 6,
        "icon": "smu-logo.png",
        "name": "SMU Gardening Championships",
        "format": "single-elimination",
        "band": "upper",
        "startDate": new Date(),
        "endDate": new Date(),
        "signupEndDate": new Date(),
        "status": "ongoing",
        "signUpPercentage": 60,
        "numberOfSignups": 38,
        "capacity": 64,
        "timeWeight": 30,
        "memWeight": 10,
        "testCaseWeight": 60,
        "currentRound": "Quarter-Finals",
        "currentRoundEndDate": new Date("2024-12-07T03:24:00"),
    },
    {
        "id": 7,
        "icon": "smu-logo.png",
        "name": "SMU Gardening Championships",
        "format": "single-elimination",
        "band": "upper",
        "startDate": new Date(),
        "endDate": new Date(),
        "signupEndDate": new Date(),
        "status": "upcoming",
        "signUpPercentage": 60,
        "numberOfSignups": 38,
        "capacity": 64,
        "timeWeight": 30,
        "memWeight": 10,
        "testCaseWeight": 60,
        "currentRound": "Quarter-Finals",
        "currentRoundEndDate": new Date("2024-12-07T03:24:00"),
    },
    {
        "id": 8,
        "icon": "smu-logo.png",
        "name": "SMU Gardening Championships",
        "format": "single-elimination",
        "band": "upper",
        "startDate": new Date(),
        "endDate": new Date(),
        "signupEndDate": new Date(),
        "status": "upcoming",
        "signUpPercentage": 60,
        "numberOfSignups": 38,
        "capacity": 64,
        "timeWeight": 30,
        "memWeight": 10,
        "testCaseWeight": 60,
        "currentRound": "Quarter-Finals",
        "currentRoundEndDate": new Date("2024-12-07T03:24:00"),
    },
    {
        "id": 9,
        "icon": "smu-logo.png",
        "name": "SMU Gardening Championships",
        "format": "single-elimination",
        "band": "upper",
        "startDate": new Date(),
        "endDate": new Date(),
        "signupEndDate": new Date(),
        "status": "upcoming",
        "signUpPercentage": 60,
        "numberOfSignups": 38,
        "capacity": 64,
        "timeWeight": 30,
        "memWeight": 10,
        "testCaseWeight": 60,
        "currentRound": "Quarter-Finals",
        "currentRoundEndDate": new Date("2024-12-07T03:24:00"),
    },
]

export const userTournamentCardData = [
    {
        "id": 1,
        "icon": "smu-logo.png",
        "name": "SMU Gardening Championships",
        "format": "single-elimination",
        "band": "upper",
        "startDate": new Date("2024-10-18T03:24:00"),
        "endDate": new Date("2024-12-17T03:24:00"),
        "signupEndDate": new Date("2024-10-16T03:24:00"),
        "status": "ongoing",
        "signUpPercentage": 60,
        "numberOfSignups": 38,
        "capacity": 64,
        "timeWeight": 30,
        "memWeight": 20,
        "testCaseWeight": 50,
        "currentRound": "Quarter-Finals",
        "currentRoundEndDate": new Date("2024-12-17T03:24:00"),
        "signedUp": true,
        "participated": false,
        "signpsOpen": true,
        "placing": -1,
    },
    {
        "id": 2,
        "icon": "smu-logo.png",
        "name": "SMU Gardening Championships",
        "format": "double-elimination",
        "band": "upper",
        "startDate": new Date("2024-10-02T03:24:00"),
        "endDate": new Date("2024-12-22T03:24:00"),
        "signupEndDate": new Date("2024-10-01T03:24:00"),
        "status": "ongoing",
        "signUpPercentage": 60,
        "numberOfSignups": 38,
        "capacity": 64,
        "timeWeight": 40,
        "memWeight": 15,
        "testCaseWeight": 45,
        "currentRound": "Quarter-Finals",
        "currentRoundEndDate": new Date("2024-10-17T03:24:00"),
        "signedUp": true,
        "participated": true,
        "signpsOpen": false,
        "placing": -1,
    },
    {
        "id": 3,
        "icon": "smu-logo.png",
        "name": "SMU Gardening Championships",
        "format": "single-elimination",
        "band": "middle",
        "startDate": new Date("2024-09-05T03:24:00"),
        "endDate": new Date("2024-09-07T03:24:00"),
        "signupEndDate": new Date("2024-09-03T03:24:00"),
        "status": "completed",
        "signUpPercentage": 30,
        "numberOfSignups": 10,
        "capacity": 32,
        "timeWeight": 69,
        "memWeight": 31,
        "testCaseWeight": 0,
        "currentRound": "Final",
        "currentRoundEndDate": new Date("2023-09-07T03:24:00"),
        "signedUp": true,
        "participated": true,
        "signpsOpen": false,
        "placing": 6,
    },
    {
        "id": 4,
        "icon": "smu-logo.png",
        "name": "SMU Gardening Championships",
        "format": "single-elimination",
        "band": "upper",
        "startDate": new Date("2024-10-27T03:24:00"),
        "endDate": new Date("2024-10-30T03:24:00"),
        "signupEndDate": new Date("2024-10-22T03:24:00"),
        "status": "ongoing",
        "signUpPercentage": 85,
        "numberOfSignups": 13,
        "capacity": 16,
        "timeWeight": 50,
        "memWeight": 35,
        "testCaseWeight": 15,
        "currentRound": "Quarter-Finals",
        "currentRoundEndDate": new Date("2024-11-17T03:24:00"),
        "signedUp": false,
        "participated": false,
        "signpsOpen": true,
        "placing": -1,
    },
    {
        "id": 5,
        "icon": "smu-logo.png",
        "name": "SMU Gardening Championships",
        "format": "single-elimination",
        "band": "lower",
        "startDate": new Date("2024-06-01T03:24:00"),
        "endDate": new Date("2024-06-17T03:24:00"),
        "signupEndDate": new Date("2024-05-31T03:24:00"),
        "status": "completed",
        "signUpPercentage": 50,
        "numberOfSignups": 32,
        "capacity": 64,
        "timeWeight": 40,
        "memWeight": 0,
        "testCaseWeight": 60,
        "currentRound": "Grand Finals",
        "currentRoundEndDate": new Date("2024-06-17T03:24:00"),
        "signedUp": false,
        "participated": true,
        "signpsOpen": false,
        "placing": 23,
    },
    {
        "id": 6,
        "icon": "smu-logo.png",
        "name": "SMU Gardening Championships",
        "format": "single-elimination",
        "band": "upper",
        "startDate": new Date("2024-08-20T03:24:00"),
        "endDate": new Date("2024-10-29T03:24:00"),
        "signupEndDate": new Date("2024-08-17T03:24:00"),
        "status": "ongoing",
        "signUpPercentage": 60,
        "numberOfSignups": 38,
        "capacity": 64,
        "timeWeight": 30,
        "memWeight": 10,
        "testCaseWeight": 60,
        "currentRound": "Round of 16",
        "currentRoundEndDate": new Date("2024-10-15T03:24:00"),
        "signedUp": true,
        "participated": false,
        "signpsOpen": false,
        "placing": -1,
    },
    {
        "id": 7,
        "icon": "smu-logo.png",
        "name": "SMU Gardening Championships",
        "format": "single-elimination",
        "band": "upper",
        "startDate": new Date("2024-10-20T03:24:00"),
        "endDate": new Date("2024-10-29T03:24:00"),
        "signupEndDate": new Date("2024-10-17T03:24:00"),
        "status": "upcoming",
        "signUpPercentage": 60,
        "numberOfSignups": 38,
        "capacity": 64,
        "timeWeight": 30,
        "memWeight": 10,
        "testCaseWeight": 60,
        "currentRound": "Round of 16",
        "currentRoundEndDate": new Date("2024-10-15T03:24:00"),
        "signedUp": false,
        "participated": false,
        "signpsOpen": true,
        "placing": -1,
    },
    {
        "id": 8,
        "icon": "smu-logo.png",
        "name": "SMU Gardening Championships",
        "format": "single-elimination",
        "band": "upper",
        "startDate": new Date("2024-10-20T03:24:00"),
        "endDate": new Date("2024-10-29T03:24:00"),
        "signupEndDate": new Date("2024-10-17T03:24:00"),
        "status": "upcoming",
        "signUpPercentage": 60,
        "numberOfSignups": 38,
        "capacity": 64,
        "timeWeight": 30,
        "memWeight": 10,
        "testCaseWeight": 60,
        "currentRound": "Round of 16",
        "currentRoundEndDate": new Date("2024-10-15T03:24:00"),
        "signedUp": false,
        "participated": false,
        "signpsOpen": true,
        "placing": -1,
    },
    {
        "id": 9,
        "icon": "smu-logo.png",
        "name": "SMU Gardening Championships",
        "format": "single-elimination",
        "band": "upper",
        "startDate": new Date("2024-10-20T03:24:00"),
        "endDate": new Date("2024-10-29T03:24:00"),
        "signupEndDate": new Date("2024-10-17T03:24:00"),
        "status": "upcoming",
        "signUpPercentage": 60,
        "numberOfSignups": 38,
        "capacity": 64,
        "timeWeight": 30,
        "memWeight": 10,
        "testCaseWeight": 60,
        "currentRound": "Round of 16",
        "currentRoundEndDate": new Date("2024-10-15T03:24:00"),
        "signedUp": false,
        "participated": false,
        "signpsOpen": true,
        "placing": -1,
    },
]

export const userNotificationData = [
    {
        "id": 1,
        "category": "alert",
        "message": "Round Ending Soon",
        "description": "Your have an uncompleted round in this tournament. Please attempt the round before it ends. Failure to do so will result in a walkover for your opponent",
        "datetime": new Date(),
        "tournament": {
            "id": 1,
            "name": "SMU Gardening Championships"
        },
        "read": false
    },
    {
        "id": 2,
        "category": "issue",
        "message": "Performance Update Required",
        "description": "Please review your submitted code.",
        "datetime": new Date(),
        "tournament": {
            "id": 1,
            "name": "SMU Gardening Championships"
        },
        "read": false
    },
    {
        "id": 3,
        "category": "notification",
        "message": "Tournament Registration Approved",
        "description": "Congratulations! You have been accepted into this tournament, which will commence on 14 Oct 2024, 12:00",
        "datetime": new Date(),
        "tournament": {
            "id": 1,
            "name": "SMU Gardening Championships"
        },        
        "read": true
    },
    {
        "id": 4,
        "category": "notification",
        "message": "Test Message",
        "description": "This is some text that is supposed to be very long to check if the line clamp function works properly because I cannot think of any other way to test this functionality.",
        "datetime": new Date(),
        "tournament": {
            "id": 1,
            "name": "SMU Gardening Championships"
        },        
        "read": true
    },
]

