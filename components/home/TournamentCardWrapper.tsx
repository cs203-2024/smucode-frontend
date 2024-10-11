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

    let adminData: TournamentCardInfo[] = [];
    let userData: UserTournamentCardInfo[] = [];

    async function getDataForAdmin(username: string) {
        try {
            adminData = await getAllTournamentsCreatedByAdmin(username);
            return adminData;
        } catch (error) {
            console.error(error);
        }
    }

    async function getDataForUser(username: string) {
        try {
            userData = await getAllTournamentsForUser(username);
            return userData;
        } catch (error) {
            console.error(error);
        }
    }

    if (user?.role === "admin") {
        getDataForAdmin(username);
    } else {
        getDataForUser(username);
    }
    
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
                                        {user?.role === "admin" ? tournamentCardData.filter((item) => item.status === "upcomiing").map((data) => (
                                            <TournamentCard key={data.id} {...data as TournamentCardInfo} />
                                        )):userTournamentCardData.filter((item) => item.status === "upcoming").map((data) => (
                                            <UserTournamentCard key={data.id} {...data as UserTournamentCardInfo} />
                                        ))}

                                        {/* Uncomment below when real data is present */}

                                        {/* {user?.role === "admin" ? adminData.filter((item) => item.status === "upcoming").map((data) => (
                                            <TournamentCard key={data.id} {...data as TournamentCardInfo} />
                                        )):userData.filter((item) => item.status === "upcoming").map((data) => (
                                            <UserTournamentCard key={data.id} {...data as UserTournamentCardInfo} />
                                        ))} */}
                                    </div>
                                    <ScrollBar orientation="horizontal" />
                                </ScrollArea>
                            </TabsContent>
                        
                            <TabsContent value="ongoing" className='w-full'>
                                <ScrollArea className='max-w-9/12 whitespace-nowrap'>
                                    <div className='flex justify-start items-center gap-3 pb-4'>
                                        {user?.role === "admin" ? tournamentCardData.filter((item) => item.status === "ongoing").map((data) => (
                                            <TournamentCard key={data.id} {...data as TournamentCardInfo} />
                                        )):userTournamentCardData.filter((item) => item.status === "ongoing").map((data) => (
                                            <UserTournamentCard key={data.id} {...data as UserTournamentCardInfo} />
                                        ))}

                                        {/* Uncomment below when real data is present */}

                                        {/* {user?.role === "admin" ? adminData.filter((item) => item.status === "ongoing").map((data) => (
                                            <TournamentCard key={data.id} {...data as TournamentCardInfo} />
                                        )):userData.filter((item) => item.status === "ongoing").map((data) => (
                                            <UserTournamentCard key={data.id} {...data as UserTournamentCardInfo} />
                                        ))} */}
                                    </div>
                                    <ScrollBar orientation="horizontal" />
                                </ScrollArea>
                            </TabsContent>

                            <TabsContent value="completed" className='w-full'>
                                <ScrollArea className='max-w-9/12 whitespace-nowrap'>
                                    <div className='flex justify-start items-center gap-3 pb-4'>
                                        {user?.role === "admin" ? tournamentCardData.filter((item) => item.status === "completed").map((data) => (
                                            <TournamentCard key={data.id} {...data as TournamentCardInfo} />
                                        )):userTournamentCardData.filter((item) => item.status === "completed").map((data) => (
                                            <UserTournamentCard key={data.id} {...data as UserTournamentCardInfo} />
                                        ))}

                                        {/* Uncomment below when real data is present */}
                                        
                                        {/* {user?.role === "admin" ? adminData.filter((item) => item.status === "completed").map((data) => (
                                            <TournamentCard key={data.id} {...data as TournamentCardInfo} />
                                        )):userData.filter((item) => item.status === "completed").map((data) => (
                                            <UserTournamentCard key={data.id} {...data as UserTournamentCardInfo} />
                                        ))} */}
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