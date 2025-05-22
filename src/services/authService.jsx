/**
 * Зберігає токен авторизації та дані користувача у localStorage.
 * @param {string} token - Токен авторизації.
 * @param {object} user - Об'єкт користувача, який буде збережено у форматі JSON.
 */
export const saveAuthData = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
};

/**
 * Отримує об'єкт користувача з localStorage.
 * @returns {object|null} Об'єкт користувача або null, якщо дані відсутні.
 */
export const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

/**
 * Отримує токен авторизації з localStorage.
 * @returns {string|null} Токен або null, якщо він відсутній.
 */
export const getToken = () => localStorage.getItem("token");

/**
 * Перевіряє, чи користувач автентифікований (наявність токена).
 * @returns {boolean} true, якщо токен існує, інакше false.
 */
export const isAuthenticated = () => !!getToken();

/**
 * Видаляє токен та дані користувача з localStorage (вихід з системи).
 */
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

/**
 * Отримує дані авторизованого користувача з localStorage.
 * @returns {object|null} Об'єкт користувача або null, якщо дані відсутні.
 */
export const getAuthUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

/**
 * Перевіряє, чи має поточний користувач роль адміністратора.
 * @returns {boolean} true, якщо роль 'admin', інакше false.
 */
export const isAdmin = () => {
    const user = getAuthUser();
    return user && user.role === 'admin';
};
