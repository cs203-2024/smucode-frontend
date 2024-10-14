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

interface UserTournamentCardProps {
    data: UserTournamentCardInfo;
    fetchData: () => Promise<void>; // fetchData is a function that returns a Promise<void>
};

export default function UserTournamentCard({data,fetchData}: UserTournamentCardProps) {
    const {user, logout} = useUserContext();
    const username = user ? user.username:"";
    //const [registered, setRegistered] = useState(data.signedUp);

    // useEffect(() => {
    //     setRegistered(data.signedUp);
    // }, [user, registered]);

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
                        {data.currentRound ? (
                            <>
                                {data.currentRound}  (<span className={cn(
                                    data.status === "ACTIVE" ? "inline-block text-red-500":"inline-block"
                                )}>{getTimeUntil(data.currentRoundEndDate)}</span>)
                            </>
                        ):(
                            <span>Tournament Commencing on {getFormattedDateFromString(data.startDate)}</span>
                        )}
                    </CardDescription>
                )}
            </CardHeader>
            <CardContent className="space-y-1">
                <div className={cn(
                    'text-sm font-medium pb-1',
                    data.status != "COMPLETED" ? "":"text-gray-400"
                )}>
                    {capitalise(data.format)} 
                    {/* • {capitalise(data.band)} Band */}
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
                <div className='flex justify-end items-center gap-2'>
                    {data.signupsOpen ? (
                        <AlertDialogDemo fetchData={fetchData} registered={data.signedUp} tournamentId={data.id} username={username} />
                    ):(
                        data.participated ? (
                            data.status != "COMPLETED" ? (
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

interface AlertDialogDemoProps {
    registered: boolean;
    fetchData: () => Promise<void>; // fetchData function returning a Promise
    //setRegistered: Dispatch<SetStateAction<boolean>>; // State setter for 'registered'
    tournamentId: number;
    username: string;
}

function AlertDialogDemo({
    registered,
    fetchData,
    //setRegistered,
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
            //setRegistered(true);
        } catch (error) {
            toast({
                title: "Unsuccessful Registration",
                description: "Uh-oh, we encountered a problem while signing you up. Please try again.",
                variant: "destructive",  
            });
        }
    }

    async function removeSignUp() {
        try {
            console.log("removing signup...")
            const response = await removeSignUpForTournament(signUpData);
            toast({
                title: "Successfully Removed Registration!",
                description: "You have successfully removed your registration from this tournament.",
            });
            fetchData();
            //setRegistered(false);
        } catch (error) {
            toast({
                title: "Error Removing Registration",
                description: "Looks like you were unable to leave this tournament. Please try again.",
                variant: "destructive",  
            });
        }
    }

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
                    Your registration will be removed from the tournament system and you may not be able to participate in the tournament again.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={removeSignUp}>Leave</AlertDialogAction>
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
                <AlertDialogAction onClick={confirmSignUp}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}