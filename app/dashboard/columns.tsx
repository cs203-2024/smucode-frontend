"use client"

import { capitalise } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Tournament = {
    id: number,
    name: string
}

export type Notification = {
    id: number
    category: "alert" | "notification" | "issue" | "warning"
    message: string
    description: string
    tournament: Tournament
    time: Date
}

export const columns: ColumnDef<Notification>[] = [
    {
        accessorKey: "id",
        header: () => <div className="w-[40px]">ID</div>,
        cell: ({row}) => {
            const id = "#" + row.getValue("id");
            return <div className="w-[40px] font-medium">{id}</div>
        }
    },
    {
        accessorKey: "category",
        header: () => <div className="w-[80px]">Category</div>,
        cell: ({row}) => {
            return <div className="w-[80px]"><Badge className='rounded-full bg-black text-white hover:bg-black'>{capitalise(row.getValue("category"))}</Badge></div>
        }
    },
    {
        accessorKey: "message",
        header: () => <div className="w-auto">Message</div>,
        cell: ({row}) => {
            return <div className="w-auto">{row.getValue("message")}</div>
        }
    },
    {
        accessorKey: "tournament",
        header: () => <div className="w-[120px] text-center">Tournament</div>,
        cell: ({row}) => {
            const tournamentObj: Tournament = row.getValue("tournament");
            return <div className="w-[120px]">{tournamentObj.name}</div>
        }
    },
    {
        accessorKey: "time",
        header: () => <div className="w-[100px] text-right">Date</div>,
        cell: ({ row }) => {
        const date: Date = row.getValue("time");
        const formatted = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    
        return <div className="w-[100px] text-right">{formatted}</div>
        },
    },
]
