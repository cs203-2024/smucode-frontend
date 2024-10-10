"use client"

import {createContext, useState, ReactNode, useContext, useEffect} from 'react';
import { User, UserContextType } from '@/components/types';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const dummyAdminUser: User = {
      username: "adminDaddy",
      email: "admin@example.com",
      profileImageUrl: null,
      role: "user", // Role is "admin"
      mu: 25,
      sigma: 8.333,
      skillIndex: 0,
    };

    // Set the dummy user with the admin role
    setUser(dummyAdminUser);
  }, []);

  const logout = async () => {
    try {
      setUser(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
      <UserContext.Provider value={{ user, setUser, logout }}>
        {children}
      </UserContext.Provider>
  );
};


export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
