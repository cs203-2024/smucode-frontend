"use client"

import React, {useState, useEffect, Dispatch, SetStateAction, ComponentProps} from 'react';
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
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { notificationData2, userNotificationData } from "./testdata"
import { NotificationData } from '../types';
import { useUserContext } from '@/context/UserContext';
import NotificationCard from './NotificationCard';
import { getAllNotifications, markNotificationAsRead, markNotificationAsUnRead } from '@/services/notificationAPI';
import { toast } from 'sonner';

export default function NotificationCardWrapper() {
    const { user, logout } = useUserContext();

    const username = user ? user.username:"";
    const [newNotifications, setNewNotifications] = useState<NotificationData[]>([]);
    const [existingNotifications, setExistingNotifications] = useState<NotificationData[]>([]);

    // Listen for new notifs
    useEffect(() => {
        // Create a new EventSource for the SSE endpoint
        console.log("listening on port 8082...");
        const eventSource = new EventSource('http://localhost:8082/api/notifications/subscribe');

        // Listen for messages from the server
        eventSource.onmessage = (event) => {
            console.log("Received SSE message:", event.data);
            const notifResponse = JSON.parse(event.data)
            setNewNotifications((prev) => [...prev, notifResponse]);
        };

        // Handle errors
        eventSource.onerror = (error) => {
            console.error("SSE error:", error);
            eventSource.close();
        };

        // Close the EventSource when the component unmounts
        return () => {
            eventSource.close();
        };
    }, []);

    async function fetchData() {
        try {
            const notificationResponse = await getAllNotifications(); 
            console.log("Existing notifs received!");
            setExistingNotifications(notificationResponse);
        } catch(error) {
            console.error("Unable to get notification from axios:", error);
        }
    }

    async function markAsRead(id: string) {
        try {
            const response = await markNotificationAsRead(id);
            toast.success("Marked as read!");
            fetchData();
        } catch(error) {
            toast.error("Unable to mark as read. Please try again.")
            console.error("Unable to mark as read...", error);
        }
    }

    async function markAsUnread(id: string) {
        try {
            const response = await markNotificationAsUnRead(id);
            toast.success("Marked as unread!");
            fetchData();
        } catch(error) {
            toast.error("Unable to mark as unread. Please try again.")
            console.error("Unable to mark as unread...", error);
        }
    }

    useEffect(() => {     

        fetchData(); // Call the function
    }, [user]); // Ensure it runs when `user` or `username` is available
    
    return (
        <div>
            <Card className='w-full'>
                <CardContent>
                    <Tabs defaultValue="unread" className="w-full">
                        <div className='flex justify-between items-end pt-3'>
                        <div className='py-3'>
                            <CardTitle className='py-1'>Notifications</CardTitle>
                            <CardDescription>Latest notifications for me</CardDescription>
                        </div>
                        <TabsList className="grid w-[168px] grid-cols-2 mb-4">
                            <TabsTrigger value="unread" className='font-semibold w-[80px]'>Unread</TabsTrigger>
                            <TabsTrigger value="read" className='font-semibold w-[80px]'>Read</TabsTrigger>
                        </TabsList>
                        </div>

                        <TabsContent value="unread" className='w-full'>
                            <ScrollArea className='h-[55vh] w-full whitespace-nowrap pr-3'>
                                <div className='pb-1'>
                                    {newNotifications.filter((item) => !item.isRead).map((data) => (
                                        <NotificationCard key={data.id} data={data} action={markAsRead} isNew={true} />
                                    ))}
                                    {existingNotifications.filter((item) => !item.isRead).map((data) => (
                                        <NotificationCard key={data.id} data={data} action={markAsRead} isNew={false} />
                                    ))}
                                    {notificationData2.filter((item) => !item.isRead).map((data) => (
                                        <NotificationCard key={data.id} data={data} action={markAsRead} isNew={false} />
                                    ))}
                                </div>
                            </ScrollArea>
                        </TabsContent>
                    
                        <TabsContent value="read" className='w-full'>
                            <ScrollArea className='h-[55vh] w-full whitespace-nowrap pr-3'>
                                <div className='pb-1'>
                                    {existingNotifications.filter((item) => item.isRead).map((data) => (
                                        <NotificationCard key={data.id} data={data} action={markAsUnread} isNew={false} />
                                    ))}
                                    {notificationData2.filter((item) => item.isRead).map((data) => (
                                        <NotificationCard key={data.id} data={data} action={markAsUnread}  isNew={false} />
                                    ))}
                                </div>
                            </ScrollArea>
                        </TabsContent>

                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
