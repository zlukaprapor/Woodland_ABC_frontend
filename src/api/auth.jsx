import apiClient from "./client";

/**
 * Реєструє нового користувача.
 *
 * Надсилає POST-запит до `/auth/register` з даними нового користувача для створення облікового запису.
 *
 * @async
 * @function
 * @param {Object} userData - Дані нового користувача
 * @param {string} userData.email - Електронна пошта користувача
 * @param {string} userData.username - Ім’я користувача
 * @param {string} userData.password - Пароль користувача
 * @returns {Promise<Object>} Об'єкт з даними створеного користувача або повідомленням про успіх
 *
 * @example
 * const newUser = await registerUser({
 *   email: "test@example.com",
 *   username: "myname",
 *   password: "securepassword"
 * });
 * console.log(newUser);
 */
export const registerUser = async (userData) => {
    const response = await apiClient.post("/auth/register", userData);
    return response.data;
};

/**
 * Авторизує користувача.
 *
 * Надсилає POST-запит до `/auth/login` з обліковими даними користувача для отримання JWT-токена.
 *
 * @async
 * @function
 * @param {Object} userData - Дані для входу
 * @param {string} userData.email - Електронна пошта користувача
 * @param {string} userData.password - Пароль користувача
 * @returns {Promise<Object>} Об'єкт із JWT-токеном і даними користувача
 *
 * @example
 * const loginResult = await loginUser({
 *   email: "test@example.com",
 *   password: "securepassword"
 * });
 * console.log(loginResult.token); // токен авторизації
 */
export const loginUser = async (userData) => {
    const response = await apiClient.post("/auth/login", userData);
    return response.data;
};
