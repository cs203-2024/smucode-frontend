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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function TournamentCard() {
    return (
        <Card>
            <CardHeader>
                <div className='w-full flex justify-between items-center gap-10'>
                    <div className='flex w-auto justify-start items-center gap-4'>
                        <Avatar className='w-8 h-8 bg-gray-100'>
                            <AvatarImage src="smu-logo.png" />
                            <AvatarFallback>SMU</AvatarFallback>
                        </Avatar>
                        <CardTitle>SMUCode Challenge 2024</CardTitle>
                    </div>
                    <Badge className='rounded-full bg-ongoing hover:bg-ongoing'>Ongoing</Badge>
                </div>
                <CardDescription className='py-2'>
                    Round of 16 - (<div className='inline-block text-red-500'>23h 16m remaining</div>)
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                Latest Results: Smash
            </CardContent>
            <CardFooter className='flex justify-between items-center'>
                <CardDescription className='py-2'>
                    13 Sep 2024 - 18 Sep 2024
                </CardDescription>
                <Button className='font-semibold'>Manage</Button>
            </CardFooter>
        </Card>
    )
}