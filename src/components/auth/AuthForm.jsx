import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import FormInput from "./FormInput.jsx";
import StatusMessage from "./StatusMessage.jsx";
import {loginUser, registerUser} from "../../api/auth.jsx";
import {saveAuthData} from "../../services/authService.jsx";
import {authFormStyles} from "../../styles/authStyles.js";

/**
 * Компонент форми аутентифікації (вхід або реєстрація)
 *
 * @component
 * @param {boolean} isLogin - Визначає, чи форма призначена для входу (true) або реєстрації (false)
 * @returns {JSX.Element} Візуальний компонент форми входу або реєстрації
 */
export default function AuthForm({isLogin = true}) {
    // Початкові значення полів форми залежно від режиму (вхід або реєстрація)
    const initialFormData = isLogin
        ? {email: "", password: ""}
        : {username: "", email: "", password: ""};

    // Стани форми
    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState(null);           // Повідомлення про помилки
    const [success, setSuccess] = useState(null);       // Повідомлення про успіх
    const [isLoading, setIsLoading] = useState(false);  // Індикатор завантаження

    const navigate = useNavigate(); // Хук для переходу по маршрутах

    /**
     * Обробник зміни полів форми
     * @param {Event} e - Подія введення у поле
     */
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    /**
     * Обробник відправки форми
     * Виконує вхід або реєстрацію, обробляє відповіді та помилки
     * @param {Event} e - Подія відправки форми
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setIsLoading(true);

        try {
            if (isLogin) {
                // Виконання запиту на вхід
                const res = await loginUser(formData);
                const {access_token, user} = res;

                saveAuthData(access_token, user); // Збереження токена і даних користувача
                setSuccess("Вхід успішний! 🎉");

                // Перенаправлення на відповідну сторінку залежно від ролі
                setTimeout(() => {
                    if (user.role === "admin") {
                        navigate("/admin", {replace: true});
                    } else {
                        navigate("/dashboard", {replace: true});
                    }
                }, 1000);
            } else {
                // Виконання запиту на реєстрацію
                const res = await registerUser(formData);
                setSuccess(res.message || "Реєстрація успішна! 🎉");

                // Переадресація на сторінку входу
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            }
        } catch (err) {
            // Обробка помилки з повідомленням
            const detail = err.response?.data?.detail;
            setError(Array.isArray(detail)
                ? detail.map(d => d.msg).join(", ")
                : detail || (isLogin ? "Невірний email або пароль." : "Помилка при реєстрації"));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={authFormStyles.form}>
            {/* Заголовок форми */}
            <h2 style={authFormStyles.header}>
                {isLogin ? "🌲 Вхід до Лісової абетки" : "🎉 Реєстрація в Лісовій абетці"}
            </h2>

            {/* Поле для імені при реєстрації */}
            {!isLogin && (
                <FormInput
                    name="username"
                    placeholder="Ваше ім'я"
                    value={formData.username || ""}
                    onChange={handleChange}
                    required
                />
            )}

            {/* Поле email */}
            <FormInput
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />

            {/* Поле паролю */}
            <FormInput
                name="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={handleChange}
                isPassword
                required
            />

            {/* Кнопка відправки форми */}
            <button
                type="submit"
                style={{
                    ...authFormStyles.button,
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

            {/* Повідомлення про статус */}
            <StatusMessage error={error} success={success}/>

            {/* Навігаційні посилання */}
            <div style={authFormStyles.container}>
                {isLogin ? (
                    <p>
                        Немає облікового запису?{" "}
                        <span
                            onClick={() => navigate("/register")}
                            style={authFormStyles.statusMes}
                        >
                            Зареєструватися
                        </span>
                    </p>
                ) : (
                    <p>
                        Вже є обліковий запис?{" "}
                        <span
                            onClick={() => navigate("/login")}
                            style={authFormStyles.statusMes}
                        >
                            Увійти
                        </span>
                    </p>
                )}
                <p style={authFormStyles.navigateP}>
                    <span
                        onClick={() => navigate("/")}
                        style={authFormStyles.navigateSpan}
                    >
                        ← На головну
                    </span>
                </p>
            </div>
        </form>
    );
}
