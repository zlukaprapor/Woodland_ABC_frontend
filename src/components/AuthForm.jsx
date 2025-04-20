import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import StatusMessage from "./StatusMessage";
import { formStyles } from "../styles/commonStyles";
import { loginUser, registerUser } from "../api/auth";
import { saveAuthData } from "../services/authService";

export default function AuthForm({ isLogin = true }) {
    const initialFormData = isLogin
        ? { email: "", password: "" }
        : { username: "", email: "", password: "" };

    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            if (isLogin) {
                const res = await loginUser(formData);
                const { access_token, user } = res;

                saveAuthData(access_token, user);
                setSuccess("Вхід успішний!");

                setTimeout(() => {
                    if (user.role === "admin") {
                        navigate("/admin", { replace: true });
                    } else {
                        navigate("/dashboard", { replace: true });
                    }
                }, 1000);
            } else {
                const res = await registerUser(formData);
                setSuccess(res.message || "Реєстрація успішна!");

                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            }
        } catch (err) {
            const detail = err.response?.data?.detail;
            setError(Array.isArray(detail)
                ? detail.map(d => d.msg).join(", ")
                : detail || (isLogin ? "Невірний email або пароль." : "Помилка при реєстрації"));
        }
    };

    return (
        <form onSubmit={handleSubmit} style={formStyles.form}>
            <h2>{isLogin ? "Логін" : "🎉 Реєстрація"}</h2>

            {!isLogin && (
                <FormInput
                    name="username"
                    placeholder="Ім'я"
                    value={formData.username || ""}
                    onChange={handleChange}
                    required
                />
            )}

            <FormInput
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <FormInput
                name="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={handleChange}
                isPassword
                required
            />

            <button type="submit" style={formStyles.button}>
                {isLogin ? "Увійти" : "Зареєструватися"}
            </button>

            <StatusMessage error={error} success={success} />
        </form>
    );
}