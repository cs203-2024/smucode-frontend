"use client"

import {useState, useEffect, Dispatch, SetStateAction, ComponentProps} from 'react';
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
    // const [newNotifications, setNewNotifications] = useState<Omit<NotificationData, "username" | "createdAt" | "isRead">[]>([]);
    // const [existingNotifications, setExistingNotifications] = useState<NotificationData[]>([]);
    const [notifications, setNotifications] = useState<NotificationData[]>([]);
    const [loadingNotifications, setLoadingNotifications] = useState(true);

    // Listen for new notifs
    useEffect(() => {
        // If notifications still loading, defer starting eventSource to prevent 403 when accessToken expired (EventSource is unable to catch 403)
        if(loadingNotifications) return;
        const connectEventSource = () => {

            const eventSource = new EventSource('http://localhost:9000/api/notifications/subscribe', { withCredentials: true });
              
            eventSource.onmessage = (event) => {
                console.log("Received SSE message:", JSON.parse(event.data));
                const notifResponse = JSON.parse(event.data);
            
                if (notifResponse) {
                    // Add isNew property as true for notifications from SSE
                    const newNotification = { ...notifResponse, isNew: true };
                    setNotifications((prev) => [...prev, newNotification]);
                }
            };

            eventSource.onerror = async (error) => {
                console.error("SSE error:", error);
                eventSource.close();
            };

            // Close the EventSource when the component unmounts
            return () => {
                eventSource.close();
            };
        };

        // Initialize the connection
        connectEventSource();
    }, [loadingNotifications]);

    async function fetchData() {
        try {
            const notificationResponse = await getAllNotifications();
            console.log("Existing notifications received!");
            setNotifications(notificationResponse);
        } catch (error) {
            console.error("Unable to get notifications:", error);
        } finally {
            setLoadingNotifications(false);
        }
    }

    async function markAsRead(id: string) {
        try {
            await markNotificationAsRead(id);
            toast.success("Marked as read!");
            setNotifications((prev) =>
                prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif))
            );
        } catch (error) {
            toast.error("Unable to mark as read. Please try again.");
            console.error("Unable to mark as read...", error);
        }
    }

    async function markAsUnread(id: string) {
        try {
            await markNotificationAsUnRead(id);
            toast.success("Marked as unread!");
            setNotifications((prev) =>
                prev.map((notif) => (notif.id === id ? { ...notif, isRead: false } : notif))
            );
        } catch (error) {
            toast.error("Unable to mark as unread. Please try again.");
            console.error("Unable to mark as unread...", error);
        }
    }

    useEffect(() => {     
        if(user){
            fetchData(); // Call the function
        }
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

                        <TabsContent value="unread" className='w-full flex'>
                            <ScrollArea className='h-[55vh] w-full whitespace-nowrap pr-3'>
                                <div className='pb-1'>
                                {loadingNotifications ? (
                                    <>
                                        <div className="flex items-center mt-8 justify-center h-full">
                                            <p className="text-center text-gray-500">Loading notifications</p>
                                        </div>
                                    </>
                                ):(
                                    <>
                                        {!loadingNotifications && notifications && notifications.filter((item) => !item.isRead).length > 0 ? (
                                            <>
                                            {notifications
                                                .filter((item) => !item.isRead)
                                                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                                                .map((data) => (
                                                <NotificationCard key={data.id} data={data} action={markAsRead} isNew={data.isNew || false} />
                                                ))}
                                            </>
                                        ) : (
                                            <div className="flex items-center mt-8 justify-center h-full">
                                                <p className="text-center text-gray-500">No new notifications</p>
                                            </div>
                                        )}
                                    </>
                                )}
                                    {/* {notificationData2.filter((item) => !item.isRead).map((data) => (
                                        <NotificationCard key={data.id} data={data} action={markAsRead} isNew={false} />
                                    ))} */}
                                </div>
                            </ScrollArea>
                        </TabsContent>
                    
                        <TabsContent value="read" className='w-full'>
                            <ScrollArea className='h-[55vh] w-full whitespace-nowrap pr-3'>
                                <div className='pb-1'>
                                {loadingNotifications ? (
                                    <>
                                        <div className="flex items-center mt-8 justify-center h-full">
                                            <p className="text-center text-gray-500">Loading notifications</p>
                                        </div>
                                    </>
                                ):(
                                    <>
                                        {!loadingNotifications && notifications && notifications.filter((item) => item.isRead).length > 0 ? (
                                            <>
                                            {notifications
                                                .filter((item) => item.isRead)
                                                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                                                .map((data) => (
                                                    <NotificationCard key={data.id} data={data} action={markAsUnread} isNew={false} />
                                                ))}
                                            </>
                                        ) : (
                                            <>
                                            <div className="flex items-center mt-8 justify-center h-full">
                                                <p className="text-center text-gray-500">No notifications</p>
                                            </div>
                                            </>
                                        )}
                                    </>
                                )}
                                    {/* {notificationData2.filter((item) => item.isRead).map((data) => (
                                        <NotificationCard key={data.id} data={data} action={markAsUnread}  isNew={false} />
                                    ))} */}
                                </div>
                            </ScrollArea>
                        </TabsContent>

                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
