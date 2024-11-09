"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { useUserContext } from '@/context/UserContext';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton'; // Import the skeleton component

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

interface User {
  username: string,
  profileImageUrl?: string;
  role: string;
}

interface UserContextType {
  user: User | null;
  logout: () => void;
  loading: boolean;
}

const Nav = (): JSX.Element => {
  const { user, logout, loading } = useUserContext() as UserContextType;
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState<Boolean>(user?.role === "ROLE_ADMIN");

  useEffect(() => {
    if (user) {
      setIsAdmin(user.role === "ROLE_ADMIN");
    }
  }, [user]);

  const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
    const isActive = pathname === href;
    return (
      <div className="relative h-[60px] flex items-center">
        <Link 
          href={href} 
          className={`${
            isActive 
              ? "text-[#3B82F6] font-medium" 
              : "text-gray-700 hover:text-gray-900"
          } transition-colors duration-200`}
        >
          {children}
        </Link>
        {isActive && (
          <div className="absolute bottom-0 left-0 w-full border-b-2 border-[#3B82F6]" />
        )}
      </div>
    );
  };

  return (
    <nav className="fixed top-0 flex z-50 justify-between h-[60px] items-center w-full bg-white shadow-md p-4">
      <div className="flex items-center gap-10">
        <Link href={user ? "/dashboard" : "/"} className="flex gap-2 items-center">
          <Image src="/assets/images/logo.png" width={30} height={30} className="object-contain" alt="logo" />
          <p className="logo_text logo_text_gradient">BrawlCode</p>
        </Link>
        <div className="flex gap-7">
          {user && !isAdmin && <NavLink href="/tournaments/explore">Explore</NavLink>}
          {user && <NavLink href="/dashboard">Dashboard</NavLink>}
        </div>
      </div>

      <div className="relative flex items-center justify-center gap-3">
        {loading ? (
          <Skeleton className="my-1 w-[35px] h-[35px] rounded-full" />
        ) : user ? (
          <>
            <div className="relative mt-1">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Image
                    src={user?.profileImageUrl || '/assets/images/default_profile.png'}
                    width={35}
                    height={35}
                    className="cursor-pointer rounded-full w-[35px] h-[35px] object-cover"
                    alt="profile"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={`/profile/${user?.username}`} className='pl-0 py-1 pr-[60px]'>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='cursor-pointer' onClick={logout}>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        ) : (
          pathname !== "/login" && (
            <Button asChild className="mr-1">
              <Link href="/login">Login</Link>
            </Button>
          )
        )}
      </div>
    </nav>
  );
};

export default Nav;
