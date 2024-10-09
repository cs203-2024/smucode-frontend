"use client"

import Image from "next/image";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import TournamentCardWrapper from "@/components/home/TournamentCardWrapper";
import NotificationCard from "@/components/home/NotificationCard";

export default function Home() {

    return (
      <main className="flex-col flex min-h-full flex gap-3 items-start justify-center py-8 px-20 mt-[60px]">
        <div className="w-full flex justify-between items-center space-between mb-6">
          <div className="text-2xl font-bold text-left">Dashboard</div>
          <Link href={`/tournaments/create`}>
            <Button>Create Tournament</Button>
          </Link>
        </div>
        
        <div className="w-full grid grid-cols-11 gap-4">
          <div className="col-span-7">
            <TournamentCardWrapper />
          </div>
          <div className="col-span-4">
            <NotificationCard />
          </div>
        </div>
      </main>
    )
}
