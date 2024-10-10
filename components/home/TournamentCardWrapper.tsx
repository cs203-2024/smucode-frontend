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
import { TournamentCardInfo } from '../types';
import { UserTournamentCardInfo } from '../types';
import { tournamentCardData } from './testdata';
import { userTournamentCardData } from './testdata';
import { useUserContext } from '@/context/UserContext';

export default function TournamentCardWrapper() {
    const { user, logout } = useUserContext();
    
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
                        <TabsList className="grid w-[310px] grid-cols-2 mb-4">
                            <TabsTrigger value="ongoing" className='font-semibold w-[150px]'>Ongoing</TabsTrigger>
                            <TabsTrigger value="completed" className='font-semibold w-[150px]'>Completed</TabsTrigger>
                        </TabsList>
                        
                            <TabsContent value="ongoing" className='w-full'>
                                <ScrollArea className='max-w-9/12 whitespace-nowrap'>
                                    <div className='flex justify-start items-center gap-3 pb-4'>
                                        {user?.role === "admin" ? tournamentCardData.filter((item) => item.status === "active").map((data) => (
                                            <TournamentCard key={data.id} {...data as TournamentCardInfo} />
                                        )):userTournamentCardData.filter((item) => item.status === "active").map((data) => (
                                            <UserTournamentCard key={data.id} {...data as UserTournamentCardInfo} />
                                        ))}
                                        {/* {tournamentCardData.filter((item) => item.status === "active").map((data) => (
                                            <TournamentCard key={data.id} {...data as TournamentCardInfo} />
                                        ))}                                */}
                                        {/* {userTournamentCardData.filter((item) => item.status === "active").map((data) => (
                                            <UserTournamentCard key={data.id} {...data as UserTournamentCardInfo} />
                                        ))} */}
                                    </div>
                                    <ScrollBar orientation="horizontal" />
                                </ScrollArea>
                            </TabsContent>
                            <TabsContent value="completed" className='w-full'>
                                <ScrollArea className='max-w-9/12 whitespace-nowrap'>
                                    <div className='flex justify-start items-center gap-3 pb-4'>
                                        {user?.role === "admin" ? tournamentCardData.filter((item) => item.status != "active").map((data) => (
                                            <TournamentCard key={data.id} {...data as TournamentCardInfo} />
                                        )):userTournamentCardData.filter((item) => item.status != "active").map((data) => (
                                            <UserTournamentCard key={data.id} {...data as UserTournamentCardInfo} />
                                        ))}
                                        {/* {tournamentCardData.filter((item) => item.status != "active").map((data) => (
                                            <TournamentCard key={data.id} {...data as TournamentCardInfo} />
                                        ))}                               */}
                                        {/* {userTournamentCardData.filter((item) => item.status != "active").map((data) => (
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