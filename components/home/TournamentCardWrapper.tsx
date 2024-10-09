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
import { TournamentCardInfo } from '../types';

import { tournamentCardData } from './testdata';

export default function TournamentCardWrapper() {
    
    return (
        <div>
            <Card className='w-full'>
                <CardHeader>
                    <CardTitle>My Tournaments</CardTitle>
                    <CardDescription>Some information about my tournaments here</CardDescription>
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
                                        {tournamentCardData.filter((item) => item.status === "active").map((data) => (
                                            <TournamentCard key={data.id} {...data as TournamentCardInfo} />
                                        ))}                               
                                    </div>
                                    <ScrollBar orientation="horizontal" />
                                </ScrollArea>
                            </TabsContent>
                            <TabsContent value="completed" className='w-full'>
                                <ScrollArea className='max-w-9/12 whitespace-nowrap'>
                                    <div className='flex justify-start items-center gap-3 pb-4'>
                                        {tournamentCardData.filter((item) => item.status != "active").map((data) => (
                                            <TournamentCard key={data.id} {...data as TournamentCardInfo} />
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