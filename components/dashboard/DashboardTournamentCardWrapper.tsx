"use client"

import React, {useState, useEffect} from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area"
import { TournamentCardInfo, UserTournamentCardInfo } from '../types';
import { useUserContext } from '@/context/UserContext';
import { getAllTournamentsCreatedByAdmin, getAllTournamentsForUser } from '@/services/tournamentAPI';
import UserDashboardTournamentCard from './UserDashboardTournamentCard';
import AdminDashboardTournamentCard from './AdminDashboardTournamentCard';

export default function DashboardTournamentCardWrapper() {
    const { user, logout } = useUserContext();

    const username = user ? user.username:"";
    const [adminData, setAdminData] = useState<TournamentCardInfo[]>([]); // Use state for adminData
    const [userData, setUserData] = useState<UserTournamentCardInfo[]>([]);

    async function getDataForAdmin() {
        try {
            const response = await getAllTournamentsCreatedByAdmin();
            console.log("Admin data received in wrapper");
            console.log(response[0]);
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async function getDataForUser() {
        try {
            const response = await getAllTournamentsForUser();
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchData() {
        if (user?.role === "ROLE_ADMIN") {
            const adminDataResponse = (await getDataForAdmin()) ?? [];
            console.log("Admin data received:", adminDataResponse);
            setAdminData(adminDataResponse); // Update the state with the fetched data
        } else {
            const userDataResponse = (await getDataForUser()) ?? [];
            console.log("User data received:", userDataResponse);
            setUserData(userDataResponse); // Update the state with the fetched data
        }
    }

    useEffect(() => {     

        fetchData(); // Call the function
    }, [user]); // Ensure it runs when `user` or `username` is available
    
    return (
        <div>
            <Card className='w-full'>
                <CardContent>
                    <Tabs defaultValue="ongoing" className="w-full">
                        <div className='flex justify-between items-end pt-3'>
                        <div className='py-3'>
                            <CardTitle className='py-1'>My Tournaments</CardTitle>
                            <CardDescription>
                                {user?.role === "ROLE_ADMIN" ? "Manage all tournaments created by me":"View all available and participated tournaments"}
                            </CardDescription>
                        </div>
                        <TabsList className="grid w-[465px] grid-cols-3 mb-4">
                            <TabsTrigger value="upcoming" className='font-semibold w-[150px]'>Upcoming</TabsTrigger>
                            <TabsTrigger value="ongoing" className='font-semibold w-[150px]'>Ongoing</TabsTrigger>
                            <TabsTrigger value="completed" className='font-semibold w-[150px]'>Completed</TabsTrigger>
                        </TabsList>
                        </div>

                        <TabsContent value="upcoming" className='w-full'>
                                <ScrollArea className='h-[55vh] w-full whitespace-nowrap pr-3'>
                                    <div className='pb-4'>
                                        {/* {user?.role === "ROLE_ADMIN" ? tournamentCardData2.filter((item) => item.status.toLowerCase() === "upcoming").map((data) => (
                                            <AdminDashboardTournamentCard key={data.id} data={data} fetchData={() => fetchData()} />
                                        )):userTournamentCardData2.filter((item) => item.status.toLowerCase() === "upcoming" && item.signedUp).map((data) => (
                                            <UserDashboardTournamentCard key={data.id} data={data} fetchData={() => fetchData()} />
                                        ))} */}

                                        {user?.role === "ROLE_ADMIN" ? (
                                            adminData.filter((item) => item.status.toLowerCase() === "upcoming").length <= 0 ? (
                                                <div className='flex justify-center items-center h-full w-full p-16 text-gray-500'>No Upcoming tournaments</div>
                                            ) : (
                                                <div>{/* Content for admin with ongoing tournaments */}</div>
                                            )
                                        ) : (
                                            userData.filter((item) => item.status.toLowerCase() === "upcoming").length <= 0 ? (
                                                <div className='flex justify-center items-center h-full w-full p-16 text-gray-500'>No Upcoming tournaments</div>
                                            ) : (
                                                <div>{/* Content for user with ongoing tournaments */}</div>
                                            )
                                        )}

                                        {/* Uncomment below when real data is present */}

                                        {user?.role === "ROLE_ADMIN" ? adminData.filter((item) => item.status.toLowerCase() === "upcoming").map((data) => (
                                            <AdminDashboardTournamentCard key={data.id} data={data} fetchData={() => fetchData()} />
                                        )):userData.filter((item) => item.status.toLowerCase() === "upcoming" && item.signedUp).map((data) => (
                                            <UserDashboardTournamentCard key={data.id} data={data} fetchData={() => fetchData()} />
                                        ))}
                                    </div>
                                </ScrollArea>
                            </TabsContent>
                        
                            <TabsContent value="ongoing" className='w-full'>
                                <ScrollArea className='h-[55vh] w-full pr-3'>
                                    <div className='pb-4'>
                                        {/* {user?.role === "ROLE_ADMIN" ? tournamentCardData2.filter((item) => item.status.toLowerCase() === "ongoing").map((data) => (
                                            <AdminDashboardTournamentCard key={data.id} data={data} fetchData={() => fetchData()} />
                                        )):userTournamentCardData2.filter((item) => item.status.toLowerCase() === "ongoing" && item.participated).map((data) => (
                                            <UserDashboardTournamentCard key={data.id} data={data} fetchData={() => fetchData()} />
                                        ))} */}

                                        {user?.role === "ROLE_ADMIN" ? (
                                            adminData.filter((item) => item.status.toLowerCase() === "ongoing").length <= 0 ? (
                                                <div className='flex justify-center items-center h-full w-full p-16 text-gray-500'>No Ongoing tournaments</div>
                                            ) : (
                                                <div>{/* Content for admin with ongoing tournaments */}</div>
                                            )
                                        ) : (
                                            userData.filter((item) => item.status.toLowerCase() === "ongoing").length <= 0 ? (
                                                <div className='flex justify-center items-center h-full w-full p-16 text-gray-500'>No Ongoing tournaments</div>
                                            ) : (
                                                <div>{/* Content for user with ongoing tournaments */}</div>
                                            )
                                        )}

                                        

                                        {/* Uncomment below when real data is present */}

                                        {user?.role === "ROLE_ADMIN" ? adminData.filter((item) => item.status.toLowerCase() === "ongoing").map((data) => (
                                            <AdminDashboardTournamentCard key={data.id} data={data} fetchData={() => fetchData()} />
                                        )):userData.filter((item) => item.status.toLowerCase() === "ongoing" && item.participated).map((data) => (
                                            <UserDashboardTournamentCard key={data.id} data={data} fetchData={() => fetchData()} />
                                        ))}
                                    </div>
                                </ScrollArea>
                            </TabsContent>

                            <TabsContent value="completed" className='w-full'>
                                <ScrollArea className='h-[55vh] whitespace-nowrap pr-3'>
                                    <div className='pb-4'>
                                        {/* {user?.role === "ROLE_ADMIN" ? tournamentCardData2.filter((item) => item.status.toLowerCase() === "completed").map((data) => (
                                            <AdminDashboardTournamentCard key={data.id} data={data} fetchData={() => fetchData()} />
                                        )):userTournamentCardData2.filter((item) => item.status.toLowerCase() === "completed" && item.participated).map((data) => (
                                            <UserDashboardTournamentCard key={data.id} data={data} fetchData={() => fetchData()} />
                                        ))} */}

                                        {user?.role === "ROLE_ADMIN" ? (
                                            adminData.filter((item) => item.status.toLowerCase() === "completed").length <= 0 ? (
                                                <div className='flex justify-center items-center h-full w-full p-16 text-gray-500'>No Completed tournaments</div>
                                            ) : (
                                                <div>{/* Content for admin with ongoing tournaments */}</div>
                                            )
                                        ) : (
                                            userData.filter((item) => item.status.toLowerCase() === "completed").length <= 0 ? (
                                                <div className='flex justify-center items-center h-full w-full p-16 text-gray-500'>No Completed tournaments</div>
                                            ) : (
                                                <div>{/* Content for user with ongoing tournaments */}</div>
                                            )
                                        )}

                                        {/* Uncomment below when real data is present */}

                                        {user?.role === "ROLE_ADMIN" ? adminData.filter((item) => item.status.toLowerCase() === "completed").map((data) => (
                                            <AdminDashboardTournamentCard key={data.id} data={data} fetchData={() => fetchData()} />
                                        )):userData.filter((item) => item.status.toLowerCase() === "completed" && item.participated).map((data) => (
                                            <UserDashboardTournamentCard key={data.id} data={data} fetchData={() => fetchData()} />
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