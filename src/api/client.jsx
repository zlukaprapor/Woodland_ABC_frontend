import axios from "axios";
import { getToken } from "../services/authService";
import { API_BASE_URL } from "../constants/config";

/**
 * Axios-клієнт для взаємодії з бекендом.
 *
 * Створює екземпляр Axios з базовими заголовками і налаштуванням `withCredentials`.
 * Використовується у всіх API-запитах до сервера.
 */
const apiClient = axios.create({
    baseURL: API_BASE_URL, // Базовий URL API, наприклад: http://localhost:8000/api/v1
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true // Додає cookie (наприклад, для CORS з авторизацією)
});

/**
 * Інтерсептор для додавання JWT-токена до кожного запиту.
 *
 * Перед відправкою запиту отримує токен із `localStorage` або іншого сховища
 * і додає його в заголовок `Authorization` у форматі Bearer.
 *
 * @param {import("axios").InternalAxiosRequestConfig} config - Конфігурація запиту
 * @returns {import("axios").InternalAxiosRequestConfig} Модифікована конфігурація
 */
apiClient.interceptors.request.use(
    (config) => {
        const token = getToken(); // Отримання токена з сервісу
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Додавання заголовка
        }
        return config;
    },
    (error) => Promise.reject(error) // Обробка помилок при налаштуванні запиту
);

export default apiClient;
