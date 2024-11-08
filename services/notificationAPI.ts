import axiosClient from './axiosClient';
import { NotificationData } from '@/components/types';

export const getAllNotifications = async ():Promise<NotificationData[]> => {
    try {
        const response = await axiosClient.get<NotificationData[]>(`/notifications`); 
        return response.data;
    } catch (error) {
        console.error("Error retrieving notifications:", error);
        throw error;
    }
}

// export const getAllNotifications = async (): Promise<NotificationData[]> => {
//     try {
//         const response = await fetch('http://localhost:8082/api/notifications', { // Use your API endpoint here
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             credentials: 'include' // Optional: use this if your API requires credentials
//         });

//         // Check if the response is OK
//         if (!response.ok) {
//             throw new Error(`Error retrieving notifications: ${response.statusText}`);
//         }

//         // Parse and return the JSON response
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Error retrieving notifications:", error);
//         throw error;
//     }
// };

export const markNotificationAsRead = async (id: string):Promise<string> => {
    try {
        const response = await axiosClient.patch<string>(`/notifications/${id}/read`); 
        return response.data;
    } catch (error) {
        console.error("Error marking notification as read:", error);
        throw error;
    }
}

export const markNotificationAsUnRead = async (id: string):Promise<string> => {
    try {
        const response = await axiosClient.patch<string>(`/notifications/${id}/unread`); 
        return response.data;
    } catch (error) {
        console.error("Error marking notification as unread:", error);
        throw error;
    }
}