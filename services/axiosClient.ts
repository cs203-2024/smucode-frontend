import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";

const axiosClient = axios.create({
  baseURL: process.env.API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
  withCredentials: true,
});

// Request interceptor to attached JWT to auth header
axiosClient.interceptors.request.use(
    function (config) {
        const accessToken = Cookies.get('accessToken'); // Get the 'authToken' cookie

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        config.withCredentials = true;

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);


// Response interceptor for handling errors globally
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;
    
    if (error.response?.status === 401) {
      if (!request._retry) {
        request._retry = true;
        
        try {
          await axiosClient.post('/auth/refresh');
          
          return axiosClient(request);
        } catch (refreshError) {
          Cookies.remove('accessToken'); // Clean up if needed
          Router.push("/login");
          
          return Promise.reject(refreshError);
        }
      } else {
        // Handle case where retry already failed
        Router.push("/login");
      }
    } else if (error.response?.status === 500) {
      console.error("Something went wrong on our end, try again");
    } else {
      console.error("Network error");
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
