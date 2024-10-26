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
        const accessToken = localStorage.get('accessToken'); // Get the 'authToken' cookie

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
    
    if (error.response.status === 401 && !request._retry) {
      request._retry = true;  // Avoid looping if refresh fails
      
      try {
        const refreshResponse = await axiosClient.post('/auth/refresh');
        
        const newAccessToken = refreshResponse.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        // Update the Authorization header with the new token
        request.headers['Authorization'] = `Bearer ${newAccessToken}`;
        
        // Retry the original request with the new access token
        return axiosClient(request);
      
      } catch (refreshError) {
        console.error('Refresh token expired. Redirecting to login.');
        Router.push("/login")
        
        return Promise.reject(refreshError);
      }
    } else {
      console.error("Network error:", error.message);
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
