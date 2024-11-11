import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api.brawlcode.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Response interceptor for handling errors globally
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;

    if (
      error.response?.status === 401 &&
      !request.url.includes("/auth/login") &&
      !request._retry
    ) {
      request._retry = true;
      try {
        await axiosClient.post("/auth/refresh");
        return axiosClient(request);
      } catch {
        //Redirects user back to the previous page after re-login
        sessionStorage.setItem("redirectAfterLogin", window.location.href);
        console.error("Unable to refresh access token, re-login required");
        //Remove user state
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    } else if (error.response?.status === 500) {
      console.error("Something went wrong on our end, please try again.");
    } else if (!error.response) {
      console.error("Network error");
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
