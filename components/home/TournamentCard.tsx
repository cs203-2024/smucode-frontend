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
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import { MdMemory } from "react-icons/md";
import { MdAccessTimeFilled } from "react-icons/md";
import { RiNumbersFill } from "react-icons/ri";
import { TournamentCardInfo } from '../types';
import { capitalise, getFormattedDateFromString, getPercentage, getTimeUntil, upperCaseToCapitalised } from '@/lib/utils';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface TournamentCardProps {
    data: TournamentCardInfo;
    fetchData: () => Promise<void>; // fetchData is a function that returns a Promise<void>
};

export default function TournamentCard(
    {data,fetchData}: TournamentCardProps
) {
    return (
        <Card>
            <CardHeader>
                <div className='w-full flex justify-between items-center gap-10'>
                    <div className='flex w-auto justify-start items-center gap-4'>
                        <Avatar className='w-8 h-8 bg-gray-100'>
                            <AvatarImage src={data.icon ? data.icon:"smu-logo.png"} />
                            <AvatarFallback>{data.name ? data.name.substring(0, 3):"IMG"}</AvatarFallback>
                        </Avatar>
                        <CardTitle className={cn(
                            data.status != "COMPLETED" ? "text-black":"text-gray-500"
                        )}>{data.name}</CardTitle>
                    </div>
                    <Badge className={cn(
                        'rounded-full',
                        data.status === "ONGOING" ? "bg-ongoing hover:bg-ongoing":"",
                        data.status === "UPCOMING" ? "bg-yellow-500 hover:bg-yellow-500":"",
                        data.status === "COMPLETED" ? "bg-gray-100 hover:bg-gray-100 text-gray-400":""
                    )}>{upperCaseToCapitalised(data.status)}</Badge>
                </div>
                {data.signupsOpen ? (
                    <CardDescription className={cn(
                        'pt-2',
                        data.status != "COMPLETED" ? "":"text-gray-400"
                    )}>
                        Registration ends <span className='font-semibold'>{getFormattedDateFromString(data.signupEndDate)} ({getTimeUntil(data.signupEndDate)})</span>
                    </CardDescription>
                ):(
                    <CardDescription className={cn(
                        'pt-2',
                        data.status != "COMPLETED" ? "":"text-gray-400"
                    )}>
                        {data.currentRound}  (<span className={cn(
                            data.status === "ACTIVE" ? "inline-block text-red-500":"inline-block"
                        )}>{getTimeUntil(data.currentRoundEndDate)}</span>)
                    </CardDescription>
                )}
            </CardHeader>
            <CardContent className="space-y-1">
                <div className={cn(
                    'text-sm font-medium pb-1',
                    data.status != "COMPLETED" ? "":"text-gray-400"
                )}>
                    {capitalise(data.format)} • {capitalise(data.band)} Band
                </div>
                <div className='flex items-center justify-start gap-2 py-2'>
                    <Badge className={cn(
                        'py-1 bg-timeWeight',
                        data.status != "COMPLETED" ? "":"bg-gray-200 text-gray-400 hover:bg-gray-200"
                    )}>
                        <MdAccessTimeFilled className='pr-1 text-lg' />Time - {data.timeWeight}%
                    </Badge>
                    <Badge className={cn(
                        'py-1 bg-memWeight',
                        data.status != "COMPLETED" ? "":"bg-gray-200 text-gray-400 hover:bg-gray-200"
                    )}>
                        <MdMemory className='pr-1 text-lg' />Memory - {data.memWeight}%
                    </Badge>
                    <Badge className={cn(
                        'py-1 bg-testCaseWeight',
                        data.status != "COMPLETED" ? "":"bg-gray-200 text-gray-400 hover:bg-gray-200"
                    )}>
                        <RiNumbersFill className='pr-1 text-lg' />Test Cases - {data.testCaseWeight}%
                    </Badge>
                </div>
                <div className='flex items-center gap-2 justify-between py-2'>
                    <Progress value={getPercentage(data.numberOfSignups, data.capacity)} className={cn(
                        'h-[8px]',
                        data.status != "COMPLETED" ? "":"bg-gray-300"
                    )} />
                    <div className={cn(
                        'text-sm font-medium text-right',
                        data.status != "COMPLETED" ? "":"text-gray-400"
                    )}>{data.numberOfSignups}/{data.capacity} participants ({getPercentage(data.numberOfSignups, data.capacity)}%)</div>
                </div>
            </CardContent>
            <CardFooter className='flex justify-between items-center'>
                <CardDescription className='py-2'>
                    {getFormattedDateFromString(data.startDate)} - {getFormattedDateFromString(data.endDate)}
                </CardDescription>
                <Link href={`tournaments/${data.id}/overview`}>
                    <Button className='font-semibold'>Manage</Button>
                </Link>
            </CardFooter>
        </Card>
    )
}