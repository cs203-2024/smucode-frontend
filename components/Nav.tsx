"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { useUserContext } from './UserContext';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
const Nav = () => {
    const { user, loading, login, logout } = useUserContext();
    
    if (loading) return <div>Loading...</div>;

    return (
        <nav className="fixed top-0 flex z-50 justify-between h-[60px] items-center w-full bg-white shadow-md p-3">
            <Link href="/" className="flex gap-2 items-center">
                <Image src="/assets/images/logo.png" width={30} height={30} className="object-contain" alt="logo" />
                <p className="logo_text">SMUCode</p>
            </Link>

            <div className="relative flex gap-3">
                {user ? (
                    <>
                        <div className="relative">
                        <DropdownMenu>
                        <DropdownMenuTrigger><Image
                                src={user?.image || '/assets/images/avatar.png'}
                                width={35}
                                height={35}
                                className="rounded-full cursor-pointer"
                                alt="profile"
                            /></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem><Link href="/profile" className='pl-0 py-1 pr-[60px]'>Profile</Link></DropdownMenuItem>
                            <DropdownMenuItem className='cursor-pointer' onClick={logout}>Sign Out</DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                        </div>
                    </>
                ) : (
                    <Button asChild className="mr-4" onClick={login}>
                        <Link href="/tournaments/testid/overview">Login</Link>
                    </Button>
                )}
            </div>
        </nav>
    );
};

export default Nav;
