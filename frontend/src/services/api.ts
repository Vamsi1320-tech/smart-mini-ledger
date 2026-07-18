import axios from "axios";

const api = axios.create({
    baseURL:
        import.meta.env.VITE_API_URL ||
        "http://127.0.0.1:8000",
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

        return config;
    },
    (error) => Promise.reject(error)
);

// Handle responses
api.interceptors.response.use(
    (response) => response,

    (error) => {

        const status = error.response?.status;

        if (status === 401 && !isRedirecting) {

            isRedirecting = true;

            localStorage.removeItem("token");

            window.location.replace("/");
        }

        return Promise.reject(error);
    }
);

export default api;