import axios from 'axios';

const tournamentAxiosClient = axios.create({
    baseURL: 'https://28ab-14-100-103-99.ngrok-free.app/api/', //TODO: change to API gateway; hardcoded for now
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

// Response interceptor for handling errors globally
tournamentAxiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                console.error('Unauthorized access.');
                // router.push(/login);
            } else if (error.response.status === 500) {
                console.error('Server error, please try again later.');
            }
        } else {
            console.error('Network error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default tournamentAxiosClient;