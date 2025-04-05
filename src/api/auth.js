import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/auth";

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

// Функція для логіну користувача
export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
};