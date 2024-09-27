import axiosClient from './http'; // Import configured Axios client
import { User } from '../models/User';

// Interface for user credentials (used for login and signup)
interface UserCredentials {
    username: string;
    password: string;
}

// Interface for login response
interface LoginResponse {
    message: string;
    userDTO: User;
    token: string;
}

// Interface for signup response
interface SignupResponse {
    message: string;
    userDTO: User;
    token?: string; // Assuming token might be included upon signup
}

// Get user by username
export const getUserByUsername = async (username: string): Promise<User> => {
    try {
        const response = await axiosClient.get<User>(`/${username}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user by username:', error);
        throw error;
    }
};

// Login function
export const login = async (credentials: UserCredentials): Promise<LoginResponse> => {
    try {
        const response = await axiosClient.post<LoginResponse>('/login', credentials);
        const { token } = response.data;

        // Store the JWT token
        localStorage.setItem('token', token);

        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

// Signup function
// Signup function
export const signup = async (newUser: Omit<User, 'id'>): Promise<SignupResponse> => {
    try {
        const response = await axiosClient.post<SignupResponse>('/signup', newUser);
        const { token } = response.data;

        // Store the JWT token if provided
        if (token) {
            localStorage.setItem('token', token);
        }

        return response.data;
    } catch (error: any) {
        console.error('Error signing up:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};


// Logout function
export const logout = async (): Promise<string> => {
    try {
        const response = await axiosClient.post<string>('/logout');

        // Remove the JWT token
        localStorage.removeItem('token');

        return response.data;
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
};

// Get user profile
export const getUserProfile = async (username: string): Promise<User> => {
    try {
        const response = await axiosClient.get<User>('/profile', { params: { username } });
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};
