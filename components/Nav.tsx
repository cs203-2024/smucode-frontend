
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button"

import { useState, useEffect } from 'react';
import { useUserContext } from './UserContext';

const Nav = () => {
    const { user, loading, login, logout } = useUserContext();
    
    // useEffect(() => {
       
    // }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <nav className="sticky top-0 flex z-50 justify-between items-center w-full bg-white shadow-md p-3 sha">
            <Link href="/" className="flex gap-2 items-center">
                <Image src="/assets/images/logo.png" width={30} height={30} className="object-contain" alt="logo" />
                    <p className="logo_text">SMUCode</p>
            </Link>


            <div className="flex gap-3 md:gap-5">
            {user ? (
            <>
                <Button variant="outline" onClick={logout}>Sign Out</Button>

                <Link href="/profile" className="mr-4">
                    <Image
                        src={user?.image || '/assets/images/avatar.png'}
                        width={35}
                        height={35}
                        className="rounded-full"
                        alt="profile"
                    />
                </Link>
            </>
            ) : (
                // Redirect to login page (Champion) REMOVE onclick event
                <Button asChild className="mr-4" onClick={login}>
                    <Link href="/tournament/brackets">Login</Link>
                </Button>
            )}
            </div>
        </nav>
    );
};

export default Nav;
