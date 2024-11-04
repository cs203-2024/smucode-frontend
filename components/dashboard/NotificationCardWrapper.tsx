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
    const [adminData, setAdminData] = useState<TournamentCardInfo[]>([]); // Use state for adminData
    const [userData, setUserData] = useState<UserTournamentCardInfo[]>([]);

    async function getDataForAdmin() {
        try {
            const response = await getAllTournamentsCreatedByAdmin();
            console.log("Admin data received in wrapper");
            console.log(response[0]);
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async function getDataForUser() {
        try {
            const response = await getAllTournamentsForUser();
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchData() {
        if (user?.role === "ROLE_ADMIN") {
            const adminDataResponse = (await getDataForAdmin()) ?? [];
            console.log("Admin data received:", adminDataResponse);
            setAdminData(adminDataResponse); // Update the state with the fetched data
        } else {
            const userDataResponse = (await getDataForUser()) ?? [];
            console.log("User data received:", userDataResponse);
            setUserData(userDataResponse); // Update the state with the fetched data
        }
    }

    useEffect(() => {     

        fetchData(); // Call the function
    }, [user]); // Ensure it runs when `user` or `username` is available
    
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

function getBadgeVariantFromLabel(label: string): ComponentProps<typeof Badge>["variant"] {
    if (["alert"].includes(label.toLowerCase())) {
        return "default"
    }
  
    if (["notification"].includes(label.toLowerCase())) {
        return "outline"
    }
  
    return "secondary"
}