"use client"

import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { User, UserContextType } from '@/components/types';
//import axios from 'axios';


const UserContext = createContext<UserContextType | undefined>(undefined);


export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

    const testuser: User = {
        username: "Adrian",
        image: '/assets/images/avatar.png',
        role: 'ADMIN'
    };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Use Jere's API
        //const response = await axios.get<{ user: User }>('/auth/verify', { withCredentials: true });
        //setUser(response.data.user); // Store user info if token is valid
        console.log("AUTH");
        setUser(testuser);
      } catch (error) {
        setUser(null); // No user if token is invalid or absent
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      //await axios.post('/auth/logout', {}, { withCredentials: true });
      setUser(null); 
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  // TO REMOVE THIS (FOR TESTING ONLY)
  const login = async () => {
    try {
      //await axios.post('/auth/logout', {}, { withCredentials: true });
      setUser(testuser); 
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, login, logout }}>
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
