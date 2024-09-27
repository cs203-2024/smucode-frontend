import axios from 'axios';

//create an Axios client with default settings
const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/api/users', //backend url
    headers: {
        //JSON request body
        'Content-Type': 'application/json',
    },
});

//FOR AUTHORISATION, uncomment once we start using OAuth??
// // Request interceptor to add authorisation tokens if needed
// axiosClient.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );
//
// // Response interceptor for handling errors globally
// axiosClient.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response) {
//             // Handle specific status codes
//             if (error.response.status === 401) {
//                 // Redirect to log in, show unauthorized message, etc.
//                 console.error('Unauthorized access - Redirecting to login.');
//             } else if (error.response.status === 500) {
//                 console.error('Server error, please try again later.');
//             }
//         } else {
//             console.error('Network error:', error.message);
//         }
//         return Promise.reject(error);
//     }
// );

export default axiosClient;