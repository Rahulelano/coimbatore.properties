import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: import.meta.env.MODE === 'production' ? '/api' : 'http://localhost:5001/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
