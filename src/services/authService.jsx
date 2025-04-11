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
