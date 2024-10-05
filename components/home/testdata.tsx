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