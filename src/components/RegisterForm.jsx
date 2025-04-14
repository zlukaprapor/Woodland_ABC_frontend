import { useState } from "react";
import { registerUser } from "../api/auth.jsx";
import { useNavigate } from "react-router-dom";

/**
 * Компонент форми реєстрації користувача.
 *
 * Реалізує:
 * - введення імені користувача, email та паролю
 * - валідацію форми на клієнті
 * - відправку даних на сервер через `registerUser`
 * - відображення повідомлень про помилки або успішну реєстрацію
 * - редірект користувача на головну сторінку після успішної реєстрації
 *
 * Особливості:
 * - приховування/відображення паролю
 * - простий кастомний стиль
 *
 * Використовує:
 * - `useState` для збереження стану форми та повідомлень
 * - `useNavigate` з react-router-dom для редіректу
 *
 * @component
 * @returns {JSX.Element} React-компонент форми реєстрації
 */
export default function RegisterForm() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate(); // Хук для редіректу

    /**
     * Оновлює стан форми при зміні інпутів
     * @param {React.ChangeEvent<HTMLInputElement>} e - Подія зміни інпута
     */
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    /**
     * Обробляє відправлення форми:
     * - надсилає дані на сервер
     * - обробляє відповіді/помилки
     * - виконує редірект при успіху
     *
     * @param {React.FormEvent<HTMLFormElement>} e - Подія відправлення форми
     * @returns {Promise<void>}
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const res = await registerUser(formData);
            setSuccess(res.message || "Реєстрація успішна!");

            // Затримка перед редіректом (1 секунда)
            setTimeout(() => {
                navigate("/"); // редірект на стартову сторінку
            }, 1000);
        } catch (err) {
            if (err.response?.data?.detail) {
                const detail = err.response.data.detail;
                setError(Array.isArray(detail) ? detail.map(d => d.msg).join(", ") : detail);
            } else {
                setError("Помилка при реєстрації");
            }
        }
    };

    /**
     * Перемикає видимість пароля
     */
    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h2>🎉 Реєстрація</h2>

            <input
                name="username"
                placeholder="Ім’я"
                value={formData.username}
                onChange={handleChange}
                style={styles.input}
                required
            />
            <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                required
            />
            <div style={styles.inputGroup}>
                <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Пароль"
                    value={formData.password}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    style={styles.toggleButton}
                >
                    {showPassword ? "Сховати" : "Показати"} пароль
                </button>
            </div>

            <button type="submit" style={styles.button}>Зареєструватися</button>

            {error && <p style={styles.error}>🚫 {error}</p>}
            {success && <p style={styles.success}>✅ {success}</p>}
        </form>
    );
}

const styles = {
    form: {
        maxWidth: "300px",
        margin: "2rem auto",
        padding: "1rem",
        background: "#fff7e6",
        borderRadius: "1rem",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        fontFamily: "Comic Sans MS, cursive",
    },
    input: {
        width: "100%",
        padding: "0.5rem",
        margin: "0.5rem 0",
        borderRadius: "0.5rem",
        border: "1px solid #ccc",
    },
    inputGroup: {
        position: "relative",
    },
    button: {
        backgroundColor: "#ffa500",
        color: "white",
        padding: "0.5rem",
        borderRadius: "0.5rem",
        border: "none",
        cursor: "pointer",
        fontWeight: "bold",
    },
    toggleButton: {
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        background: "transparent",
        border: "none",
        color: "#ffa500",
        cursor: "pointer",
    },
    error: {
        color: "red",
        marginTop: "1rem",
    },
    success: {
        color: "green",
        marginTop: "1rem",
    },
};
