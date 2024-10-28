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
import { TournamentCardInfo } from '../types';
import { capitalise, getFormattedDateFromString, getPercentage, getPlacingString, getTimeUntil, upperCaseToCapitalised } from '@/lib/utils';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useUserContext } from '@/context/UserContext';

import { signUpForTournament, removeSignUpForTournament } from '@/services/tournamentAPI';
import { TournamentSignUpInfo } from '../types';

interface AdminDashboardTournamentCardProps {
    data: TournamentCardInfo;
    fetchData: () => Promise<void>; // fetchData is a function that returns a Promise<void>
};

export default function AdminDashboardTournamentCard({data,fetchData}: AdminDashboardTournamentCardProps) {
    const {user} = useUserContext();
    const username = user ? user.username:"";

    return (
        <Card className='flex w-full grid grid-cols-12 gap-3 h-20 w-full items-center mb-3'>
            <Image src={data.icon ? `/${data.icon}`:"/smu-logo.png"} className={cn(
                'col-span-2 w-full h-16 object-contain bg-gray-100 ml-2 rounded-md',
                data.status === "COMPLETED" ? "opacity-60":""
            )} alt={data.name} width={1000} height={1000} />
            <div className='col-span-4 p-4 w-full'>
                <div className={cn(
                    "text-sm font-semibold hover:opacity-75 transition duration-150",
                    data.status != "COMPLETED" ? "text-black":"text-gray-500"
                )}>
                    <Link href={`tournaments/${data.id}/overview`}>{data.name}</Link>
                </div>
                
                {data.signupsOpen ? (
                    <CardDescription className={cn(
                        'pt-2 text-xs',
                        data.status != "COMPLETED" ? "":"text-gray-400"
                    )}>
                        Registration Closing: <span className='font-semibold'>{getFormattedDateFromString(data.signupEndDate)}</span>
                    </CardDescription>
                ):
                    data.status === "COMPLETED" ? (
                        <div className='text-gray-700 font-semibold text-sm'>Tournament Has Ended</div>
                    ):(
                        <CardDescription className={cn(
                            'pt-2 text-xs',
                            data.status != "COMPLETED" ? "":"text-gray-400"
                        )}>
                            {data.currentRound}
                            {data.status === "ONGOING" ? (
                                <span className='pl-1'>({getTimeUntil(data.currentRoundEndDate)})</span>
                            ):(
                                <span className='pl-1 font-semibold'>(No ongoing round)</span>
                            )}
                        </CardDescription>
                    )
                }

            </div>
            <div className='col-span-5 w-full p-4 flex flex-col justify-center items-end pr-12'>
                <div className='text-sm font-semibold flex justify-start items-center gap-2'>
                    <Badge className={cn(
                        ' bg-timeWeight',
                        data.status != "COMPLETED" ? "":"bg-gray-200 text-gray-400 hover:bg-gray-200"
                    )}>
                        <MdAccessTimeFilled className='pr-1 text-lg' />{data.timeWeight}%
                    </Badge>
                    <Badge className={cn(
                        ' bg-memWeight',
                        data.status != "COMPLETED" ? "":"bg-gray-200 text-gray-400 hover:bg-gray-200"
                    )}>
                        <MdMemory className='pr-1 text-lg' />{data.memWeight}%
                    </Badge>
                    <Badge className={cn(
                        'bg-testCaseWeight',
                        data.status != "COMPLETED" ? "":"bg-gray-200 text-gray-400 hover:bg-gray-200"
                    )}>
                        <RiNumbersFill className='pr-1 text-lg' />{data.testCaseWeight}%
                    </Badge>
                </div>
                <CardDescription className='pt-1 text-xs'>
                    {getFormattedDateFromString(data.startDate)} - {getFormattedDateFromString(data.endDate)}
                </CardDescription>
            </div>
            <Link href={`tournaments/${data.id}/overview`} className='col-span-1 w-full flex justify-end items-center px-4'>
                <Button className='font-semibold'>Manage</Button>
            </Link>
        </Card>
    )
}