import axiosClient from './http'; //import configured Axios client
import { User } from '@models/User'; //import existing User model

//ts interface for user credentials (used for login and signup)
interface UserCredentials {
    username: string;
    password: string;
}

export const getUserById = (id: number) => {
    return axiosClient.get<User>(`/users/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching user by ID:', error);
            throw error;
        });
};

export const login = (credentials: UserCredentials) => {
    return axiosClient.post<string>('/users/login', credentials)
        .then(response => response.data)
        .catch(error => {
            console.error('Error logging in:', error);
            throw error;
        });
};

export const signup = (newUser: Omit<User, 'id'>) => { // Exclude 'id' as it's usually set by the backend
    return axiosClient.post<User>('/users/signup', newUser)
        .then(response => response.data)
        .catch(error => {
            console.error('Error signing up:', error);
            throw error;
        });
};

export const logout = () => {
    return axiosClient.post<string>('/users/logout')
        .then(response => response.data)
        .catch(error => {
            console.error('Error logging out:', error);
            throw error;
        });
};

export const getUserProfile = (username: string) => {
    return axiosClient.get<User>(`/users/profile`, { params: { username } })
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching user profile:', error);
            throw error;
        });
};
