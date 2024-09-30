"use client"

import * as React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Notification, columns } from "@/app/dashboard/columns"
import { DataTable } from "@/app/dashboard/data-table"
import { getFormattedDate } from '@/lib/utils';

const testData = [
    {
        "id": 1,
        "category": "alert",
        "message": "Cron Job Started",
        "description": "Blah blah",
        "time": new Date(),
        "tournament": {
            "id": 1,
            "name": "SMU Gardening Championships"
        }
    },
]

function getTestData(): Notification[] {
    return [
        {
            "id": 1,
            "category": "alert",
            "message": "Cron Job Started",
            "description": "Blah blah",
            "time": new Date(),
            "tournament": {
                "id": 1,
                "name": "SMU Gardening Championships"
            }
        },
    ];
}

// function getData(): Notification[] {
//     return [
//         {
//             "id": 1,
//             "category": "alert",
//             "message": "Cron Job Started",
//             "description": "Blah blah",
//             "time": new Date(),
//             "tournament":  "SMU Gardening Championships"
//         },
//         {
//             "id": 1,
//             "category": "alert",
//             "message": "Cron Job Started",
//             "description": "Blah blah",
//             "time": new Date(),
//             "tournament":  "SMU Gardening Championships"
//         },
//         {
//             "id": 1,
//             "category": "alert",
//             "message": "Cron Job Started",
//             "description": "Blah blah",
//             "time": new Date(),
//             "tournament":  "SMU Gardening Championships"
//         },
//         {
//             "id": 1,
//             "category": "alert",
//             "message": "Cron Job Started",
//             "description": "Blah blah",
//             "time": new Date(),
//             "tournament":  "SMU Gardening Championships"
//         },
//         {
//             "id": 1,
//             "category": "alert",
//             "message": "Cron Job Started",
//             "description": "Blah blah",
//             "time": new Date(),
//             "tournament":  "SMU Gardening Championships"
//         },
//         {
//             "id": 1,
//             "category": "alert",
//             "message": "Cron Job Started",
//             "description": "Blah blah",
//             "time": new Date(),
//             "tournament":  "SMU Gardening Championships"
//         },
//         {
//             "id": 1,
//             "category": "alert",
//             "message": "Cron Job Started",
//             "description": "Blah blah",
//             "time": new Date(),
//             "tournament":  "SMU Gardening Championships"
//         },
//         {
//             "id": 1,
//             "category": "alert",
//             "message": "Cron Job Started",
//             "description": "Blah blah",
//             "time": new Date(),
//             "tournament":  "SMU Gardening Championships"
//         },
//         {
//             "id": 1,
//             "category": "alert",
//             "message": "Cron Job Started",
//             "description": "Blah blah",
//             "time": new Date(),
//             "tournament":  "SMU Gardening Championships"
//         },
//     ]
//   }

export default  function NotificationTable() {
    const data = getTestData();

    return (
        <div>
            <Card className='w-full h-full'>
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Latest issues, alerts and notifications for me</CardDescription>
                </CardHeader>
                <CardContent className='w-full'>                
                    <DataTable columns={columns} data={data} />
                </CardContent>
            </Card>
        </div>
    )
}