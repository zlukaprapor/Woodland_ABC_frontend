
import apiClient from "./client";

/**
 * Реєструє нового користувача.
 *
 * @async
 * @param {Object} userData - Дані нового користувача
 * @returns {Promise<Object>} Відповідь сервера
 */
export const registerUser = async (userData) => {
    const response = await apiClient.post("/auth/register", userData);
    return response.data;
};

/**
 * Авторизує користувача.
 *
 * @async
 * @param {Object} userData - Дані для входу
 * @returns {Promise<Object>} Відповідь з токеном та інформацією про користувача
 */
export const loginUser = async (userData) => {
    const response = await apiClient.post("/auth/login", userData);
    return response.data;
};
