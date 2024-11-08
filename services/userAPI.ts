import axiosClient from "./axiosClient";
import { UserProfile } from "@/components/types";

export const getUserProfile = async (username: string): Promise<UserProfile> => {
  try {
    const response = await axiosClient.get<UserProfile>(`/users/profile/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};