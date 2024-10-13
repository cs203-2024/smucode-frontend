import axiosClient from './axiosClient';
import { User } from '@/components/types';
import Cookies from "js-cookie";

//interface for user credentials (used for login and signup)
interface UserCredentials {
    username: string;
    password: string;
}

//interface for login response
interface LoginResponse {
    message: string;
    userDTO: User;
    token: string;
}

//interface for signup response
interface SignupResponse {
    message: string;
    userDTO: User;
    token?: string; //assuming token might be included upon signup
}

// Get user by username
export const getUserByUsername = async (username: string): Promise<User> => {
    try {
        const response = await axiosClient.get<User>(`/users/${username}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user by username:', error);
        throw error;
    }
};

export const login = async (credentials: UserCredentials): Promise<LoginResponse> => {
    try {
        const response = await axiosClient.post<LoginResponse>('/users/login', credentials);
        const { token } = response.data;

        //store the jwt token in cookies
        Cookies.set('authToken', token, { expires: 1, path: '/' });

        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const signup = async (newUser: Omit<User, 'id'>): Promise<SignupResponse> => {
    try {
        const response = await axiosClient.post<SignupResponse>('/users/signup', newUser);
        const { token } = response.data;

        //store JWT token if provided
        if (token) {
            Cookies.set('authToken', token, { expires: 1 });
        }

        return response.data;
    } catch (error: any) {
        console.error('Error signing up:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};


export const logout = async (): Promise<string> => {
    try {
        const response = await axiosClient.post<string>('/users/logout');

        // Remove the JWT token
        Cookies.remove('authToken');

        return response.data;
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
};

export const getUserProfile = async (username: string): Promise<User> => {
    try {
        const response = await axiosClient.get<User>('/users/profile', { params: { username } });
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};
