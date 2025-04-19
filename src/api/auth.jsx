import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/auth";

/**
 * Реєструє нового користувача.
 *
 * Надсилає POST-запит на `/register` з даними користувача.
 *
 * @async
 * @function
 * @param {Object} userData - Об'єкт із даними нового користувача
 * @param {string} userData.username - Ім’я користувача
 * @param {string} userData.email - Email користувача
 * @param {string} userData.password - Пароль користувача
 * @returns {Promise<Object>} Відповідь сервера (наприклад, повідомлення про успішну реєстрацію)
 */
export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

/**
 * Авторизує користувача.
 *
 * Надсилає POST-запит на `/login` з email та паролем.
 *
 * @async
 * @function
 * @param {Object} userData - Дані для входу
 * @param {string} userData.email - Email користувача
 * @param {string} userData.password - Пароль користувача
 * @returns {Promise<Object>} Відповідь сервера з токеном доступу та інформацією про користувача
 */
export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
};
