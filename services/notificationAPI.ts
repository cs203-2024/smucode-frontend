import axiosClient from './axiosClient';
import { NotificationData } from '@/components/types';

export const getAllNotifications = async ():Promise<NotificationData[]> => {
    try {
        const response = await axiosClient.get<NotificationData[]>(`/notifications/`); 
        return response.data;
    } catch (error) {
        console.error("Error retrieving notifications:", error);
        throw error;
    }
}

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