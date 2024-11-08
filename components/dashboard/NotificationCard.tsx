'use client'

import React, {ComponentProps} from 'react';
import { formatDistanceToNow } from "date-fns"
import { capitalise, cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { NotificationData } from '../types';
import { useRouter } from 'next/navigation';

interface NotificationCardProps {
    data: NotificationData; 
    action: (id: string) => Promise<void>;
    isNew: boolean;
}

export default function NotificationCard({data, action, isNew}:NotificationCardProps) {

    const router = useRouter();
    return (
        <div>
            
            <div onClick={() => router.push(`tournaments/${data.id}/overview`)} className={cn("flex w-full flex-col gap-1 p-4 border-solid border-[1px] cursor-pointer mb-4 rounded-xl", data.isRead ? "bg-gray-100" : "bg-white hover:bg-gray-100")}>
                <div className="flex items-center">
                    <div className="flex items-center gap-2">
                        <div className="font-semibold line-clamp-1">{data.type}</div>
                        {isNew && <span className="flex h-2 w-2 rounded-full bg-blue-600" />}
                    </div>
                    <div className={cn("ml-auto text-xs text-right", data.isRead ? "text-foreground" : "text-muted-foreground")}>
                        {data.createdAt && formatDistanceToNow(data.createdAt, {
                                addSuffix: true,
                            })
                        }
                    </div>
                </div>
                <div className="flex justify-start items-center gap-2 py-1">
                    <div className="text-xs font-medium">{data.tournamentName}</div>
                    <Badge variant={getBadgeVariantFromLabel(data.category)} className="px-3 py-[2px] rounded-full text-xs font-semibold">
                        {capitalise(data.category)}
                    </Badge>
                </div>
                <div className="max-w-full flex justify-between items-center gap-2 py-1">
                    <div className="text-sm text-muted-foreground w-[70%] h-auto whitespace-normal">
                        {data.message}
                    </div>
                    <div className="flex self-end justify-end h-full">
                        <Button
                            variant="outline"
                            className="h-10"
                            onClick={(e) => {
                                e.stopPropagation(); 
                                action(data.id);
                            }}
                        >
                            {data.isRead ? "Mark as Unread" : "Mark as Read"}
                        </Button>
                    </div>
                </div>
            </div>
                        
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