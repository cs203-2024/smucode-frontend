import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
  baseURL: process.env.API_BASE_URL,
    headers: {
        'Authorization': `Bearer ${'authToken'}`,
        "Content-Type": "application/json",
    },
  withCredentials: true,
});

// Request interceptor to attached JWT to auth header
axiosClient.interceptors.request.use(
    function (config) {
        const token = Cookies.get('authToken'); // Get the 'authToken' cookie

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
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
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Unauthorized access.");
        // router.push(/login);
      } else if (error.response.status === 500) {
        console.error("Server error, please try again later.");
      }
    } else {
      console.error("Network error:", error.message);
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
