'use client'

import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import { tournamentCardData, tournamentCardData2, userTournamentCardData, userTournamentCardData2 } from "@/components/home/testdata";
import UserTournamentCard from "@/components/home/UserTournamentCard";
import ExploreTournamentCard from "@/components/explore/ExploreTournamentCard";

export default function ExplorePage() {
    return (
        <main className="w-full px-8 pt-4 mt-[60px] mb-8">
            <div className="pb-6 w-full">
                <div className="font-bold text-2xl text-center p-2">Explore</div>
                <div className="text-sm text-center">Find the latest tournaments happening around you</div>
            </div>
            <ScrollArea>
                <div className="flex flex-wrap justify-center items-start gap-4">
                    {userTournamentCardData2.map((data) => (
                        <ExploreTournamentCard data={data} />
                    ))}
                </div>
            </ScrollArea>
        </main>
    )
}