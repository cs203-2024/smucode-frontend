import axiosClient from "./axiosClient";
import { User } from "@/components/types";
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
  userDTO: User;
}

export const login = async (
  credentials: UserCredentials,
): Promise<LoginResponse> => {
  try {
    const response = await axiosClient.post<LoginResponse>(
      "/auth/login",
      credentials,
    );

    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const signup = async (
  newUser: Omit<User, "id">,
): Promise<SignupResponse> => {
  try {
    const response = await axiosClient.post<SignupResponse>(
      "/auth/signup",
      newUser,
    );

    return response.data;
  } catch (error: any) {
    console.error("Error signing up:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const logout = async (): Promise<string> => {
  try {
    const response = await axiosClient.post<string>("/auth/logout");

    return response.data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export const deleteAccount = async (): Promise<string> => {
  try {
    const response = await axiosClient.delete<string>("/auth/delete-account");

    return response.data;
  } catch (error) {
    console.error("Error deleting account:", error);
    throw error;
  }
};

export const changePassword = async (): Promise<string> => {
  try {
    const response = await axiosClient.put<string>("/auth/change-password");

    return response.data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};