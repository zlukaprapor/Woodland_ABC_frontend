export const saveAuthData = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

export const getToken = () => localStorage.getItem("token");

export const isAuthenticated = () => !!getToken();

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};
// Отримання даних користувача
export const getAuthUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

// Перевірка чи користувач має роль адміністратора
export const isAdmin = () => {
    const user = getAuthUser();
    return user && user.role === 'admin';
};
