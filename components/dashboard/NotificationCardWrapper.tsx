"use client"

import React, {useState, useEffect, Dispatch, SetStateAction, ComponentProps} from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import TournamentCard from '../home/TournamentCard';
import { notificationData2, userNotificationData } from "./testdata"
import { TournamentCardInfo, UserTournamentCardInfo, UserDashboardTournamentCardInfo, NotificationData } from '../types';
import { tournamentCardData, tournamentCardData2, userTournamentCardData, userTournamentCardData2 } from '@/components/dashboard/testdata';
import { useUserContext } from '@/context/UserContext';
import { getAllTournamentsCreatedByAdmin, getAllTournamentsForUser } from '@/services/tournamentAPI';
import UserDashboardTournamentCard from './UserDashboardTournamentCard';
import UserTournamentCard from '../home/UserTournamentCard';
import AdminDashboardTournamentCard from './AdminDashboardTournamentCard';
import NotificationCard from './NotificationCard';

export default function NotificationCardWrapper() {
    const { user, logout } = useUserContext();

    const username = user ? user.username:"";
    const [notifications, setNotifications] = useState<string[]>([]);

    useEffect(() => {
        // Create a new EventSource for the SSE endpoint
        const eventSource = new EventSource('http://localhost:8083/api/notifications/subscribe');

        // Listen for messages from the server
        eventSource.onmessage = (event) => {
            console.log("Received SSE message:", event.data);
            setNotifications((prev) => [...prev, event.data]);
        };

        // Handle errors
        eventSource.onerror = (error) => {
            console.error("SSE error:", error);
            eventSource.close();
        };

        // Close the EventSource when the component unmounts
        return () => {
            eventSource.close();
        };
    }, []);

    // useEffect(() => {     

    //     fetchData(); // Call the function
    // }, [user]); // Ensure it runs when `user` or `username` is available
    
    return (
        <div>
            <Card className='w-full'>
                <CardContent>
                    <Tabs defaultValue="unread" className="w-full">
                        <div className='flex justify-between items-end pt-3'>
                        <div className='py-3'>
                            <CardTitle>Notifications</CardTitle>
                            <CardDescription>Latest notifications for me</CardDescription>
                        </div>
                        <TabsList className="grid w-[168px] grid-cols-2 mb-4">
                            <TabsTrigger value="unread" className='font-semibold w-[80px]'>Unread</TabsTrigger>
                            <TabsTrigger value="read" className='font-semibold w-[80px]'>Read</TabsTrigger>
                        </TabsList>
                        </div>

                        <TabsContent value="unread" className='w-full'>
                                <ScrollArea className='h-[55vh] w-full whitespace-nowrap pr-3'>
                                    <div className='pb-1'>
                                        {notificationData2.filter((item) => !item.isRead).map((data) => (
                                            <NotificationCard key={data.id} data={data} />
                                        ))}
                                    </div>
                                </ScrollArea>
                            </TabsContent>
                        
                            <TabsContent value="read" className='w-full'>
                                <ScrollArea className='h-[55vh] w-full whitespace-nowrap pr-3'>
                                    <div className='pb-1'>
                                        {notificationData2.filter((item) => item.isRead).map((data) => (
                                            <NotificationCard key={data.id} data={data} />
                                        ))}
                                    </div>
                                </ScrollArea>
                            </TabsContent>

                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
