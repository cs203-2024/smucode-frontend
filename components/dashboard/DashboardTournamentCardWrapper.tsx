"use client"

import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import TournamentCard from '../home/TournamentCard';
import { TournamentCardInfo, UserTournamentCardInfo, UserDashboardTournamentCardInfo } from '../types';
import { tournamentCardData, tournamentCardData2, userTournamentCardData, userTournamentCardData2 } from '@/components/home/testdata';
import { useUserContext } from '@/context/UserContext';
import { getAllTournamentsCreatedByAdmin, getAllTournamentsForUser } from '@/services/tournamentAPI';
import UserDashboardTournamentCard from './UserDashboardTournamentCard';
import UserTournamentCard from '../home/UserTournamentCard';

export default function DashboardTournamentCardWrapper() {
    const { user, logout } = useUserContext();

    const username = user ? user.username:"";
    const [adminData, setAdminData] = useState<TournamentCardInfo[]>([]); // Use state for adminData
    const [userData, setUserData] = useState<UserTournamentCardInfo[]>([]);

    // let adminData: TournamentCardInfo[] = [];
    // let userData: UserTournamentCardInfo[] = [];

    async function getDataForAdmin(username: string) {
        try {
            const response = await getAllTournamentsCreatedByAdmin(username);
            console.log("Admin data received in wrapper");
            console.log(response[0]);
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async function getDataForUser(username: string) {
        try {
            const response = await getAllTournamentsForUser(username);
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchData(username: string) {
        if (user?.role === "ROLE_ADMIN") {
            const adminDataResponse = (await getDataForAdmin(username)) ?? [];
            console.log("Admin data received:", adminDataResponse);
            setAdminData(adminDataResponse); // Update the state with the fetched data
        } else {
            const userDataResponse = (await getDataForUser(username)) ?? [];
            console.log("User data received:", userDataResponse);
            setUserData(userDataResponse); // Update the state with the fetched data
        }
    }

    useEffect(() => {     

        fetchData(username); // Call the function
    }, [user]); // Ensure it runs when `user` or `username` is available
    
    return (
        <div>
            <Card className='w-full'>
                {/* <CardHeader>
                    <CardTitle>My Tournaments</CardTitle>
                    <CardDescription>
                        {user?.role === "ROLE_ADMIN" ? "Manage all tournaments created by me":"View all available and participated tournaments"}
                    </CardDescription>
                </CardHeader> */}
                <CardContent>
                    <Tabs defaultValue="ongoing" className="w-full">
                        <div className='flex justify-between items-end pt-3'>
                        <div className='py-3'>
                            <CardTitle className='py-1'>My Tournaments</CardTitle>
                            <CardDescription>
                                {user?.role === "ROLE_ADMIN" ? "Manage all tournaments created by me":"View all available and participated tournaments"}
                            </CardDescription>
                        </div>
                        <TabsList className="grid w-[465px] grid-cols-3 mb-4">
                            <TabsTrigger value="upcoming" className='font-semibold w-[150px]'>Upcoming</TabsTrigger>
                            <TabsTrigger value="ongoing" className='font-semibold w-[150px]'>Ongoing</TabsTrigger>
                            <TabsTrigger value="completed" className='font-semibold w-[150px]'>Completed</TabsTrigger>
                        </TabsList>
                        </div>

                        <TabsContent value="upcoming" className='w-full'>
                                <ScrollArea className='h-[55vh] w-full whitespace-nowrap pr-3'>
                                    <div className='pb-4'>
                                        {user?.role === "ROLE_ADMIN" ? tournamentCardData2.filter((item) => item.status.toLowerCase() === "upcoming").map((data) => (
                                            <TournamentCard key={data.id} data={data} fetchData={() => fetchData("admin")} />
                                        )):userTournamentCardData2.filter((item) => item.status.toLowerCase() === "upcoming").map((data) => (
                                            <UserDashboardTournamentCard key={data.id} data={data} fetchData={() => fetchData("user")} />
                                        ))}

                                        {/* Uncomment below when real data is present */}

                                        {/* {user?.role === "ROLE_ADMIN" ? adminData.filter((item) => item.status.toLowerCase() === "upcoming").map((data) => (
                                            <TournamentCard key={data.id} data={data} fetchData={() => fetchData("admin")} />
                                        )):userData.filter((item) => item.status.toLowerCase() === "upcoming").map((data) => (
                                            <UserTournamentCard key={data.id} data={data} fetchData={() => fetchData(username)}  />
                                        ))} */}
                                    </div>
                                </ScrollArea>
                            </TabsContent>
                        
                            <TabsContent value="ongoing" className='w-full'>
                                <ScrollArea className='h-[55vh] w-full pr-3'>
                                    <div className='pb-4'>
                                        {user?.role === "ROLE_ADMIN" ? tournamentCardData2.filter((item) => item.status.toLowerCase() === "ongoing").map((data) => (
                                            <TournamentCard key={data.id} data={data} fetchData={() => fetchData("admin")} />
                                        )):userTournamentCardData2.filter((item) => item.status.toLowerCase() === "ongoing").map((data) => (
                                            <UserDashboardTournamentCard key={data.id} data={data} fetchData={() => fetchData("user")} />
                                        ))}

                                        {/* Uncomment below when real data is present */}

                                        {/* {user?.role === "ROLE_ADMIN" ? adminData.filter((item) => item.status.toLowerCase() === "upcoming").map((data) => (
                                            <TournamentCard key={data.id} data={data} fetchData={() => fetchData("admin")} />
                                        )):userData.filter((item) => item.status.toLowerCase() === "upcoming").map((data) => (
                                            <UserTournamentCard key={data.id} data={data} fetchData={() => fetchData(username)}  />
                                        ))} */}
                                    </div>
                                </ScrollArea>
                            </TabsContent>

                            <TabsContent value="completed" className='w-full'>
                                <ScrollArea className='h-[55vh] whitespace-nowrap pr-3'>
                                    <div className='pb-4'>
                                        {user?.role === "ROLE_ADMIN" ? tournamentCardData2.filter((item) => item.status.toLowerCase() === "completed").map((data) => (
                                            <TournamentCard key={data.id} data={data} fetchData={() => fetchData("admin")} />
                                        )):userTournamentCardData2.filter((item) => item.status.toLowerCase() === "completed").map((data) => (
                                            <UserDashboardTournamentCard key={data.id} data={data} fetchData={() => fetchData("user")} />
                                        ))}

                                        {/* Uncomment below when real data is present */}

                                        {/* {user?.role === "ROLE_ADMIN" ? adminData.filter((item) => item.status.toLowerCase() === "upcoming").map((data) => (
                                            <TournamentCard key={data.id} data={data} fetchData={() => fetchData("admin")} />
                                        )):userData.filter((item) => item.status.toLowerCase() === "upcoming").map((data) => (
                                            <UserTournamentCard key={data.id} data={data} fetchData={() => fetchData(username)}  />
                                        ))} */}
                                    </div>
                                </ScrollArea>
                            </TabsContent>

                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}