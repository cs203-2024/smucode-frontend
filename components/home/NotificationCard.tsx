'use client'

import React, {ComponentProps} from 'react';

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { capitalise, cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { notificationData } from "./testdata"

export default function NotificationCard() {
    return (
        <div>
            <Card className='w-full h-full'>
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Latest issues, alerts and notifications for me</CardDescription>
                </CardHeader>
                <CardContent className='w-full'>                
                    
                    <ScrollArea className='h-[50vh] pr-3'>
                        {notificationData.map((data) => (
                            <Link key={data.id} href={`tournaments/${data.id}`}>
                                <div className={cn(
                                    "flex w-full flex-col gap-1 p-4 border-solid border-[1px] mb-4 rounded-xl",
                                    data.read ? "bg-gray-100":"bg-white hover:bg-gray-100"
                                )}>
                                    <div className="flex items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="font-semibold">{data.message}</div>
                                            {!data.read && (
                                                <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                                            )}
                                        </div>
                                        <div
                                            className={cn(
                                                "ml-auto text-xs",
                                                data.read ? "text-foreground":"text-muted-foreground"
                                            )}
                                            >
                                            {formatDistanceToNow(data.datetime, {
                                                addSuffix: true,
                                            })}
                                        </div>
                                    </div>
                                    <div className='flex justify-start items-center gap-2 py-1'>
                                        <div className="text-xs font-medium">{data.tournament.name}</div>
                                        <Badge variant={getBadgeVariantFromLabel(data.category)} className='px-3 py-[2px] rounded-full text-xs font-semibold'>
                                            {capitalise(data.category)}
                                        </Badge>
                                    </div>
                                    <div className="line-clamp-2 text-sm text-muted-foreground py-1">
                                        {data.description}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </ScrollArea>

                </CardContent>
            </Card>
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