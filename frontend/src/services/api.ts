import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    timeout: 10000,
});

let isRedirecting = false;

// Attach JWT to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        console.log("=================================");
        console.log("API Request:", config.method?.toUpperCase(), config.url);
        console.log("Token:", token);
        console.log("=================================");

        return config;
    },
    (error) => Promise.reject(error)
);

// Handle responses
api.interceptors.response.use(
    (response) => response,

    (error) => {

        const status = error.response?.status;

        console.error("=================================");
        console.error("API Error:", status);
        console.error(error.response?.data);
        console.error("=================================");

        // JWT expired or invalid
        if (status === 401 && !isRedirecting) {

            isRedirecting = true;

            localStorage.removeItem("token");

            alert("Your session has expired. Please login again.");

            window.location.replace("/");
        }

        return Promise.reject(error);
    }
);

export default api;