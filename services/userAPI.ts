import axiosClient from "./axiosClient";
import { User, UploadLinkResponse } from "@/components/types";

export const getUserProfile = async (username: string): Promise<User> => {
  try {
    const response = await axiosClient.get<User>(`/users/profile/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const getUserImageUploadLink = async ():Promise<UploadLinkResponse> => {
  try {
    const response = await axiosClient.get<UploadLinkResponse>(`/users/generate-upload-link}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}

export const uploadUserImage = async(key: string):Promise<string> => {
  try {
    const response = await axiosClient.post<string>(`/users/upload-picture}`, key);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}
