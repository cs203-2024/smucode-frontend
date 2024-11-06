"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/context/UserContext';

interface User {
    role: string;
}
interface UserContextType {
    user: User | null;
}

const RoleBasedRedirect = () => {
    const { user } = useUserContext() as UserContextType;
    const router = useRouter();
    
    useEffect(() => {
        if(user){
            // Redirect based on role is user signed in
            switch (user?.role) {
            case 'ROLE_ADMIN':
                router.push('/dashboard');
                break;
            case 'ROLE_PLAYER':
                router.push('/tournaments/explore');
                break;
            default:
                break;
            }
        }
    }, [user, router]);

    return null;
};

export default RoleBasedRedirect;
