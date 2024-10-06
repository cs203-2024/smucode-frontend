"use client"

import {createContext, useState, ReactNode, useContext, useEffect} from 'react';
import { User, UserContextType } from '@/components/types';
import Cookies from "js-cookie";
import {jwtDecode} from 'jwt-decode';
import axiosClient from "@/app/services/http";
// import {undefined} from "zod";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      try {
        console.log('Token found');
        const decodedToken: any = jwtDecode(token);
        console.log('Decoded token:', decodedToken);

        const username = decodedToken.sub;

        fetchUserInfo(username);
      } catch (error) {

        alert('Error decoding token:');
        setUser(null);
      }
    } else {
      // alert('no token sial');
      console.log('No token found');
      setUser(null);
    }
  }, []);
  const fetchUserInfo = async (username: string) => {
    try {
      const response = await axiosClient.get<User>(`${username}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('authToken')}`,
        },
      });
      const userData = response.data;
      console.log('Fetched user info:', userData);

      const { password, ...userWithoutPassword } = userData;

      setUser(userWithoutPassword);
      console.log('yay set liao');
    } catch (error) {
      console.error('Error fetching user info:', error);
      setUser(null);
    }
  };
  const logout = async () => {
    try {
      //TODO: call logout endpoint?
      Cookies.remove('authToken');
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
