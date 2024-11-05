'use client'

import React, {ComponentProps} from 'react';

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { capitalise, cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useUserContext } from '@/context/UserContext';
import { NotificationData } from '../types';

interface NotificationCardProps {
    data: NotificationData; 
    action: (id: string) => Promise<void>;
}

export default function NotificationCard({data, action}:NotificationCardProps) {
    const { user, logout } = useUserContext();
    return (
        <div>
            
            <Link key={data.id} href={`tournaments/${data.id}/overview`}>
                <div className={cn(
                    "flex w-full flex-col gap-1 p-4 border-solid border-[1px] mb-4 rounded-xl",
                    data.isRead ? "bg-gray-100":"bg-white hover:bg-gray-100"
                )}>
                    <div className="flex items-center">
                        <div className="flex items-center gap-2">
                            <div className="font-semibold line-clamp-1">{data.type}</div>
                            {!data.isRead && (
                                <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                            )}
                        </div>
                        <div
                            className={cn(
                                "ml-auto text-xs text-right",
                                data.isRead ? "text-foreground":"text-muted-foreground"
                            )}
                            >
                            {formatDistanceToNow(data.createdAt, {
                                addSuffix: true,
                            })}
                        </div>
                    </div>
                    <div className='flex justify-start items-center gap-2 py-1'>
                        <div className="text-xs font-medium">{data.tournamentName}</div>
                        <Badge variant={getBadgeVariantFromLabel(data.category)} className='px-3 py-[2px] rounded-full text-xs font-semibold'>
                            {capitalise(data.category)}
                        </Badge>
                    </div>
                    <div className='max-w-full flex justify-betweep items-center gap-2 py-1'>
                        <div className="text-sm text-muted-foreground w-[70%] h-auto whitespace-normal">
                            {data.message}
                        </div>
                        <div className='flex self-end justify-end h-full'>
                            <Button variant={"outline"} className='h-10' onClick={() => action(data.id)}> {data.isRead ? "Mark as Unread":"Mark as Read"} </Button>
                        </div>
                    </div>
                </div>
            </Link>
                        
        </div>
    )
}

function getBadgeVariantFromLabel(label: string): ComponentProps<typeof Badge>["variant"] {
    if (["alert"].includes(label.toLowerCase())) {
        return "default"
    }
  
    if (["notification"].includes(label.toLowerCase())) {
        return "outline"
    }
  
    return "secondary"
}