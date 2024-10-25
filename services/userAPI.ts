import axiosClient from "./axiosClient";
import { User } from "@/components/types";

export const getUserProfile = async (username: string): Promise<User> => {
  try {
    const response = await axiosClient.get<User>(`/users/profile/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};
