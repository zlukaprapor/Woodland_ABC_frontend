import axios from "axios";
import { getToken } from "../services/authService";
import { API_BASE_URL } from "../constants/config";

// Створюємо базовий клієнт з конфігурацією
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
});

// Додаємо інтерсептор для автоматичного додавання токену до всіх запитів
apiClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;