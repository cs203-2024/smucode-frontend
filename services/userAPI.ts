import axiosClient from "./axiosClient";
import { UserProfile, UploadLinkResponse } from "@/components/types";

export const getUserProfile = async (username: string): Promise<UserProfile> => {
  try {
    const response = await axiosClient.get<UserProfile>(`/users/profile/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const getUserImageUploadLink = async (type: string):Promise<UploadLinkResponse> => {
  try {
    const response = await axiosClient.post<UploadLinkResponse>(`/users/get-upload-link?contentType=${type}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching get-upload-link:", error);
    throw error;
  }
}

export const uploadUserImage = async(key: string):Promise<string> => {
  try {
    const response = await axiosClient.post<string>(`/users/upload-picture`, key);
    return response.data;
  } catch (error) {
    console.error("Error posting to upload-picture:", error);
    throw error;
  }
}
