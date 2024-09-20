"use client"

import Image from "next/image";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import TournamentCardWrapper from "@/components/home/TournamentCardWrapper";


export default function Home() {

    return (
      <main className="flex-col flex min-h-full flex gap-3 items-start justify-center py-8 px-20">
        <div className="w-full flex justify-between items-center space-between mb-6">
          <div className="text-2xl font-bold text-left">Dashboard</div>
          <Link href={`/tournaments/create`}>
            <Button>Create Tournament</Button>
          </Link>
        </div>
        <TournamentCardWrapper />
      </main>
    )
}
