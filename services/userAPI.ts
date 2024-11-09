import axiosClient from "./axiosClient";
import { UserProfile, UploadLinkResponse, UploadSuccessResponse } from "@/components/types";

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

export const uploadUserImage = async(key: string):Promise<UploadSuccessResponse> => {
  try {
    const response = await axiosClient.post<UploadSuccessResponse>(`/users/upload-picture?key=${key}`);
    return response.data;
  } catch (error) {
    console.error("Error posting to upload-picture:", error);
    throw error;
  }
}
