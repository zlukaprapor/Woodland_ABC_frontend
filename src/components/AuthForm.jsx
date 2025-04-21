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
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setIsLoading(true);

        try {
            if (isLogin) {
                const res = await loginUser(formData);
                const { access_token, user } = res;

                saveAuthData(access_token, user);
                setSuccess("Вхід успішний! 🎉");

                // Перенаправлення відповідно до ролі
                setTimeout(() => {
                    if (user.role === "admin") {
                        navigate("/admin", { replace: true });
                    } else {
                        // Для звичайного користувача - перенаправлення на алфавіт
                        navigate("/dashboard", { replace: true });
                    }
                }, 1000);
            } else {
                const res = await registerUser(formData);
                setSuccess(res.message || "Реєстрація успішна! 🎉");

                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            }
        } catch (err) {
            const detail = err.response?.data?.detail;
            setError(Array.isArray(detail)
                ? detail.map(d => d.msg).join(", ")
                : detail || (isLogin ? "Невірний email або пароль." : "Помилка при реєстрації"));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={formStyles.form}>
            <h2 style={{
                color: "#2E7D32",
                marginBottom: "20px",
                textAlign: "center"
            }}>
                {isLogin ? "🌲 Вхід до Лісової абетки" : "🎉 Реєстрація в Лісовій абетці"}
            </h2>

            {!isLogin && (
                <FormInput
                    name="username"
                    placeholder="Ваше ім'я"
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

            <button
                type="submit"
                style={{
                    ...formStyles.button,
                    backgroundColor: isLogin ? "#66BB6A" : "#4CAF50",
                    opacity: isLoading ? 0.7 : 1,
                    cursor: isLoading ? "wait" : "pointer"
                }}
                disabled={isLoading}
            >
                {isLoading
                    ? (isLogin ? "Вхід..." : "Реєстрація...")
                    : (isLogin ? "Увійти" : "Зареєструватися")}
            </button>

            <StatusMessage error={error} success={success} />

            <div style={{
                marginTop: "15px",
                textAlign: "center",
                fontSize: "14px"
            }}>
                {isLogin ? (
                    <p>
                        Немає облікового запису?{" "}
                        <span
                            onClick={() => navigate("/register")}
                            style={{
                                color: "#4CAF50",
                                cursor: "pointer",
                                fontWeight: "bold",
                            }}
                        >
                            Зареєструватися
                        </span>
                    </p>
                ) : (
                    <p>
                        Вже є обліковий запис?{" "}
                        <span
                            onClick={() => navigate("/login")}
                            style={{
                                color: "#4CAF50",
                                cursor: "pointer",
                                fontWeight: "bold",
                            }}
                        >
                            Увійти
                        </span>
                    </p>
                )}
                <p style={{ marginTop: "10px" }}>
                    <span
                        onClick={() => navigate("/")}
                        style={{
                            color: "#888",
                            cursor: "pointer",
                        }}
                    >
                        ← На головну
                    </span>
                </p>
            </div>
        </form>
    );
}