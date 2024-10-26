'use client'

import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import { tournamentCardData, tournamentCardData2, userTournamentCardData, userTournamentCardData2 } from "@/components/home/testdata";
import UserTournamentCard from "@/components/home/UserTournamentCard";
import ExploreTournamentCard from "@/components/explore/ExploreTournamentCard";
import { getAllAvailableTournamentsForExplore } from "@/services/tournamentAPI";
import { UserTournamentCardInfo } from "@/components/types";

export default function ExplorePage() {
    const [exploreData, setExploreData] = useState<UserTournamentCardInfo[]>([]);

    async function getDataForExplore() {
        try {
            const response = await getAllAvailableTournamentsForExplore();
            console.log("Explore data received!");
            //console.log(response);
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchExploreData() {
        const exploreDataResponse = (await getDataForExplore()) ?? [];
        console.log("Admin data received:", exploreDataResponse);
        setExploreData(exploreDataResponse);
    }

    // useEffect(() => {
    //     setExploreData(getDataForExplore())
    // }, []);

    return (
        <main className="w-full px-8 pt-4 mt-[60px] mb-8">
            <div className="pb-8 w-full">
                <div className="font-bold text-2xl text-center p-3">Explore Tournaments</div>
                <div className="text-md text-center text-gray-600">Find the latest tournaments happening around you</div>
            </div>
            <ScrollArea>
                <div className="flex flex-wrap justify-center items-start gap-4">
                    {userTournamentCardData2.map((data) => (
                        <ExploreTournamentCard data={data} fetchData={fetchExploreData} />
                    ))}
                </div>
            </ScrollArea>
        </main>
    )
}