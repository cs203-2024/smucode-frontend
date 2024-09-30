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
        "category": "Alert",
        "message": "Cron Job Started",
        "description": "Blah blah",
        "time": new Date(),
        "tournament": {
            "id": 1,
            "name": "SMU Gardening Championships"
        }
    },
    {
        "id": 1,
        "category": "Alert",
        "message": "Cron Job Started",
        "description": "Blah blah",
        "time": new Date(),
        "tournament": {
            "id": 1,
            "name": "SMU Gardening Championships"
        }
    },
    {
        "id": 1,
        "category": "Alert",
        "message": "Cron Job Started",
        "description": "Blah blah",
        "time": new Date(),
        "tournament": {
            "id": 1,
            "name": "SMU Gardening Championships"
        }
    },
    {
        "id": 1,
        "category": "Alert",
        "message": "Cron Job Started",
        "description": "Blah blah",
        "time": new Date(),
        "tournament": {
            "id": 1,
            "name": "SMU Gardening Championships"
        }
    },
    {
        "id": 1,
        "category": "Alert",
        "message": "Cron Job Started",
        "description": "Blah blah",
        "time": new Date(),
        "tournament": {
            "id": 1,
            "name": "SMU Gardening Championships"
        }
    },
    {
        "id": 1,
        "category": "Alert",
        "message": "Cron Job Started",
        "description": "Blah blah",
        "time": new Date(),
        "tournament": {
            "id": 1,
            "name": "SMU Gardening Championships"
        }
    }
]

export default function NotificationTableWrapper() {
    return (
        <div>
            <Card className='w-full h-full'>
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Latest issues, alerts and notifications for me</CardDescription>
                </CardHeader>
                <CardContent className='w-full'>
                <Table className=''>
                    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">ID</TableHead>
                            <TableHead className="w-[100px]">Category</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead className='w-[120px]'>Tournament</TableHead>
                            <TableHead className="w-[100px] text-right">Date</TableHead>
                        </TableRow>
                    </TableHeader>
                        <ScrollArea className="h-72 w-48 rounded-md border">
                            <TableBody>
                                {testData.map((data) => (
                                <TableRow key={data.id} className='cursor-pointer'>
                                    <TableCell className="font-medium">#{data.id}</TableCell>
                                    <TableCell className="font-medium">                                    
                                        <Badge className='rounded-full bg-black text-white hover:bg-black'>{data.category}</Badge>
                                    </TableCell>
                                    <TableCell>{data.message}</TableCell>
                                    <TableCell>{data.tournament.name}</TableCell>
                                    <TableCell className="text-right">{getFormattedDate(data.time)}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </ScrollArea>
                        <TableFooter>
                            <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">$2,500.00</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}