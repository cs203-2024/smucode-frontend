"use client"

import React, {useState, useEffect} from 'react';
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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import Image from 'next/image';
import { MdMemory } from "react-icons/md";
import { MdAccessTimeFilled } from "react-icons/md";
import { RiNumbersFill } from "react-icons/ri";
import { FaCircleCheck } from "react-icons/fa6";
import { UserTournamentCardInfo } from '../types';
import { capitalise, getFormattedDate, getPlacingString, getTimeDifference } from '@/lib/utils';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function UserTournamentCard(data: UserTournamentCardInfo) {
    const [registered, setRegistered] = useState(data.signedUp);
    return (
        <Card>
            <CardHeader>
                <div className='w-full flex justify-between items-center gap-10'>
                    <div className='flex w-auto justify-start items-center gap-4'>
                        <Avatar className='w-8 h-8 bg-gray-100'>
                            <AvatarImage src={data.icon ? data.icon:"smu-logo.png"} />
                            <AvatarFallback>{data.name.substring(0, 3)}</AvatarFallback>
                        </Avatar>
                        <CardTitle className={cn(
                            data.status === "active" ? "text-black":"text-gray-500"
                        )}>{data.name}</CardTitle>
                    </div>
                    <Badge className={cn(
                        'rounded-full',
                        data.status === "active" ? "bg-ongoing hover:bg-ongoing":"bg-gray-100 hover:bg-gray-100 text-gray-400"
                    )}>{capitalise(data.status)}</Badge>
                </div>
                {data.signUpsOpen ? (
                    <CardDescription className={cn(
                        'pt-2',
                        data.status === "active" ? "":"text-gray-400"
                    )}>
                        Registration ends <span className='font-semibold'>{getFormattedDate(data.signUpDeadline)} ({getTimeDifference(new Date(), data.signUpDeadline)})</span>
                    </CardDescription>
                ):(
                    <CardDescription className={cn(
                        'pt-2',
                        data.status === "active" ? "":"text-gray-400"
                    )}>
                        {data.currentRound}  (<span className={cn(
                            data.status === "active" ? "inline-block text-red-500":"inline-block"
                        )}>{getTimeDifference(new Date(), data.roundEnds)}</span>)
                    </CardDescription>
                )}
            </CardHeader>
            <CardContent className="space-y-1">
                <div className={cn(
                    'text-sm font-medium pb-1',
                    data.status === "active" ? "":"text-gray-400"
                )}>
                    {capitalise(data.format)} • {capitalise(data.band)} Band
                </div>
                <div className='flex items-center justify-start gap-2 py-2'>
                    <Badge className={cn(
                        'py-1 bg-timeWeight',
                        data.status === "active" ? "":"bg-gray-200 text-gray-400 hover:bg-gray-200"
                    )}>
                        <MdAccessTimeFilled className='pr-1 text-lg' />Time - {data.timeWeight}%
                    </Badge>
                    <Badge className={cn(
                        'py-1 bg-memWeight',
                        data.status === "active" ? "":"bg-gray-200 text-gray-400 hover:bg-gray-200"
                    )}>
                        <MdMemory className='pr-1 text-lg' />Memory - {data.memWeight}%
                    </Badge>
                    <Badge className={cn(
                        'py-1 bg-testCaseWeight',
                        data.status === "active" ? "":"bg-gray-200 text-gray-400 hover:bg-gray-200"
                    )}>
                        <RiNumbersFill className='pr-1 text-lg' />Test Cases - {data.testCaseWeight}%
                    </Badge>
                </div>
                <div className='flex items-center gap-2 justify-between py-2'>
                    <Progress value={data.signUpPercentage} className={cn(
                        'h-[8px]',
                        data.status === "active" ? "":"bg-gray-300"
                    )} />
                    <div className={cn(
                        'text-sm font-medium text-right',
                        data.status === "active" ? "":"text-gray-400"
                    )}>{data.actualSignUp}/{data.capacity} participants ({data.signUpPercentage}%)</div>
                </div>
            </CardContent>
            <CardFooter className='flex justify-between items-center'>
                <CardDescription className='py-2'>
                    {getFormattedDate(data.startDate)} - {getFormattedDate(data.endDate)}
                </CardDescription>
                <div className='flex justify-end items-center gap-2'>
                    {data.signUpsOpen ? (
                        <AlertDialogDemo registered={data.signedUp} />
                    ):(
                        data.participated ? (
                            data.status === "active" ? (
                                <div className='flex justify-center items-center text-green-600 font-semibold text-sm px-2 gap-2'>In Progress</div>
                            ):(
                                <div className='text-gray-400 font-semibold text-sm px-2'>{getPlacingString(data.placing)}</div>
                            )
                        ):(
                            <div className='flex justify-center items-center text-gray-500 font-semibold text-sm px-2 gap-2'>Closed</div>
                        )
                    )}
                    <Link href={`tournaments/${data.id}/overview`}>
                        <Button className='font-semibold'>View</Button>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}

function AlertDialogDemo({registered}:{registered: boolean}) {
    if (registered) {
        return (
            <AlertDialog>
                <AlertDialogTrigger asChild>
                
                    <Button variant="ghost" className='flex justify-center items-center gap-2'>
                        Registered 
                        <FaCircleCheck className='text-sm' />
                    </Button>
                
                </AlertDialogTrigger>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Leave Tournament</AlertDialogTitle>
                    <AlertDialogDescription>
                    This action cannot be undone. 
                    Your registration will be removed from the tournament's system and you may not be able to participate in the tournament again.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Confirm</AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        )
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
            
                <Button variant="outline" className='flex justify-center items-center gap-2'>
                    Sign Up 
                </Button>

            </AlertDialogTrigger>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Confirm Tournament Registration</AlertDialogTitle>
                <AlertDialogDescription>
                This action will confirm your registration for this tournament. 
                If you are accepted to participate in the tournament, you will be notified before the commencement of the first round.
                <br/>
                <br/>
                Please ensure that you will be available for the entire duration of the tournament. 
                Otherwise, you may choose to leave this tournament at any time before the registration deadline.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Confirm</AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}