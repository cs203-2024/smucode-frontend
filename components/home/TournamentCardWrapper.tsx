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
import TournamentCard from './TournamentCard';
import UserTournamentCard from './UserTournamentCard';
import { TournamentCardInfo, UserTournamentCardInfo } from '../types';
import { tournamentCardData, userTournamentCardData } from './testdata';
import { useUserContext } from '@/context/UserContext';
import { getAllTournamentsCreatedByAdmin, getAllTournamentsForUser } from '@/services/tournamentAPI';

export default function TournamentCardWrapper() {
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
        if (user?.role === "admin") {
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
                <CardHeader>
                    <CardTitle>My Tournaments</CardTitle>
                    <CardDescription>
                        {user?.role === "admin" ? "Manage all tournaments created by me":"View all available and participated tournaments"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="ongoing" className="w-full">
                        <TabsList className="grid w-[465px] grid-cols-3 mb-4">
                            <TabsTrigger value="upcoming" className='font-semibold w-[150px]'>Upcoming</TabsTrigger>
                            <TabsTrigger value="ongoing" className='font-semibold w-[150px]'>Ongoing</TabsTrigger>
                            <TabsTrigger value="completed" className='font-semibold w-[150px]'>Completed</TabsTrigger>
                        </TabsList>

                        <TabsContent value="upcoming" className='w-full'>
                                <ScrollArea className='max-w-9/12 whitespace-nowrap'>
                                    <div className='flex justify-start items-center gap-3 pb-4'>
                                        {/* {user?.role === "admin" ? tournamentCardData.filter((item) => item.status.toLowerCase() === "upcoming").map((data) => (
                                            <TournamentCard key={data.id} {...data as TournamentCardInfo} />
                                        )):userTournamentCardData.filter((item) => item.status === "upcoming").map((data) => (
                                            <UserTournamentCard key={data.id} {...data as UserTournamentCardInfo} />
                                        ))} */}

                                        {/* Uncomment below when real data is present */}

                                        {user?.role === "admin" ? adminData.filter((item) => item.status.toLowerCase() === "upcoming").map((data) => (
                                            <TournamentCard key={data.id} {...data as TournamentCardInfo} />
                                        )):userData.filter((item) => item.status.toLowerCase() === "upcoming").map((data) => (
                                            <UserTournamentCard key={data.id} data={data} fetchData={() => fetchData(username)}  />
                                        ))}
                                    </div>
                                    <ScrollBar orientation="horizontal" />
                                </ScrollArea>
                            </TabsContent>
                        
                            <TabsContent value="ongoing" className='w-full'>
                                <ScrollArea className='max-w-9/12 whitespace-nowrap'>
                                    <div className='flex justify-start items-center gap-3 pb-4'>
                                        {/* {user?.role === "admin" ? tournamentCardData.filter((item) => item.status.toLowerCase() === "ongoing").map((data) => (
                                            <TournamentCard key={data.id} {...data as TournamentCardInfo} />
                                        )):userTournamentCardData.filter((item) => item.status === "ongoing").map((data) => (
                                            <UserTournamentCard key={data.id} {...data as UserTournamentCardInfo} />
                                        ))} */}

                                        {/* Uncomment below when real data is present */}

                                        {user?.role === "admin" ? adminData.filter((item) => item.status.toLowerCase() === "ongoing").map((data) => (
                                            <TournamentCard key={data.id} {...data as TournamentCardInfo} />
                                        )):userData.filter((item) => item.status.toLowerCase() === "ongoing").map((data) => (
                                            <UserTournamentCard key={data.id} data={data} fetchData={() => fetchData(username)} />
                                        ))}

                                        {/* {adminData.map((item) => (
                                            <div className='font-bold text-lg p-8'>{item.id}</div>
                                        ))} */}

                                        {/* {userData.map((item) => (
                                            <div className='font-bold text-lg p-8'>{item.id}</div>
                                        ))} */}
                                    </div>
                                    <ScrollBar orientation="horizontal" />
                                </ScrollArea>
                            </TabsContent>

                            <TabsContent value="completed" className='w-full'>
                                <ScrollArea className='max-w-9/12 whitespace-nowrap'>
                                    <div className='flex justify-start items-center gap-3 pb-4'>
                                        {/* {user?.role === "admin" ? tournamentCardData.filter((item) => item.status.toLowerCase() === "completed").map((data) => (
                                            <TournamentCard key={data.id} {...data as TournamentCardInfo} />
                                        )):userTournamentCardData.filter((item) => item.status.toLowerCase() === "completed").map((data) => (
                                            <UserTournamentCard key={data.id} {...data as UserTournamentCardInfo} />
                                        ))} */}

                                        {/* Uncomment below when real data is present */}
                                        
                                        {user?.role === "admin" ? adminData.filter((item) => item.status.toLowerCase() === "completed").map((data) => (
                                            <TournamentCard key={data.id} {...data as TournamentCardInfo} />
                                        )):userData.filter((item) => item.status === "completed").map((data) => (
                                            <UserTournamentCard key={data.id} data={data} fetchData={() => fetchData(username)}  />
                                        ))}
                                    </div>
                                    <ScrollBar orientation="horizontal" />
                                </ScrollArea>
                            </TabsContent>

                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}