'use client'

import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
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
import { capitalise, getFormattedDateFromString, getPercentage, getPlacingString, getTimeUntil, upperCaseToCapitalised } from '@/lib/utils';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useUserContext } from '@/context/UserContext';

import { signUpForTournament, removeSignUpForTournament } from '@/services/tournamentAPI';
import { TournamentSignUpInfo } from '../types';

interface ExploreTournamentCardProps {
    data: UserTournamentCardInfo;
    fetchData: () => Promise<void>; // fetchData is a function that returns a Promise<void>
};

export default function ExploreTournamentCard({data, fetchData}: ExploreTournamentCardProps) {
    const { user, logout } = useUserContext();
    const username = user ? user.username:"";

    return (
        <Card className='w-[30%] h-[50vh] p-0 overflow-hidden'>
            <div className='w-full h-4/6 relative'>
                <Image src={data.icon ? `/${data.icon}`:""} 
                    className={'w-full h-full object-contain bg-gray-100 opacity-80 brightness-[65%] hover:brightness-50 transition duration-200'} alt={data.name} width={1000} height={1000} 
                />
                <div className='z-10 absolute top-4 left-4 h-full flex flex-col justify-between items-start pb-6 pr-4'>
                    <div>
                        <div className='text-white drop-shadow-lg pb-2'>{capitalise(data.format)}</div>
                        <div className='font-semibold text-4xl text-white drop-shadow-2xl'>{data.name}</div>
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
                </div>
            </div>
            <CardContent className='mb-0 py-2'>                
                <div className='flex items-center gap-2 justify-between py-2'>
                    <Progress value={getPercentage(data.numberOfSignups, data.capacity)} className={cn(
                        'h-[8px] w-[60%]',
                        data.status != "COMPLETED" ? "":"bg-gray-300"
                    )} />
                    <div className={cn(
                        'text-sm font-medium text-right',
                        data.status != "COMPLETED" ? "":"text-gray-400"
                    )}>{data.numberOfSignups}/{data.capacity} participants</div>
                </div>
            </CardContent>
            <CardFooter className='flex justify-between items-center mt-0 py-0'>
                <CardDescription className='py-2'>
                    {getFormattedDateFromString(data.startDate)} - {getFormattedDateFromString(data.endDate)}
                </CardDescription>
                <div className='flex justify-end items-center gap-2'>
                    <AlertDialogDemo fetchData={fetchData} tournamentId={data.id} username={username} />
                    <Link href={`tournaments/${data.id}/overview`}>
                        <Button className='font-semibold'>View</Button>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}

interface AlertDialogDemoProps {
    fetchData: () => Promise<void>; // fetchData function returning a Promise
    tournamentId: number;
    username: string;
}

function AlertDialogDemo({
    fetchData,
    tournamentId,
    username,
}: AlertDialogDemoProps) {
    const signUpData = {
        username: username,
        tournamentId: tournamentId
    } as TournamentSignUpInfo;

    const { toast } = useToast();

    async function confirmSignUp() {
        try {
            console.log("signing up...");
            const response = await signUpForTournament(signUpData);
            toast({
                title: "Registration Successful!",
                description: "You have successfully registered for this tournament. You will be notified should your application to participate be accepted",
            });
            fetchData();
        } catch (error) {
            toast({
                title: "Unsuccessful Registration",
                description: "Uh-oh, we encountered a problem while signing you up. Please try again.",
                variant: "destructive",  
            });
        }
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
                <AlertDialogAction onClick={confirmSignUp}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}