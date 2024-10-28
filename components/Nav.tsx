"use client";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { useUserContext } from '@/context/UserContext';
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
  profileImageUrl?: string;
}

interface UserContextType {
  user: User | null;
  logout: () => void;
}

const Nav = (): JSX.Element => {
  const { user, logout } = useUserContext() as UserContextType;
  const pathname = usePathname();

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
        <Link href="/dashboard" className="flex gap-2 items-center">
          <Image src="/assets/images/logo.png" width={30} height={30} className="object-contain" alt="logo" />
          <p className="logo_text logo_text_gradient">BrawlCode</p>
        </Link>
        
        <div className="flex gap-7">
          <NavLink href="/tournaments/explore">Explore</NavLink>
          <NavLink href="/dashboard">Dashboard</NavLink>
        </div>
      </div>

      <div className="relative flex gap-3">
        {user ? (
          <>
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger><Image
                  src={user?.profileImageUrl || '/assets/images/avatar.png'}
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
          <Button asChild className="mr-4">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Nav;