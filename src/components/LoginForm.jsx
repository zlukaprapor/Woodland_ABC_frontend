import { useState } from "react";
import { loginUser } from "../api/auth"; // Використовуємо метод для логіну

export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showPassword, setShowPassword] = useState(false); // Додано стан для контролю видимості пароля

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            // Використовуємо функцію loginUser для логіну
            const res = await loginUser(formData);
            setSuccess("Вхід успішний! Токен отримано.");
            // Зберігаємо токен у LocalStorage або стані
            localStorage.setItem("access_token", res.access_token);
            console.log("Токен: ", res.access_token); // Можна використовувати токен для подальших запитів
        } catch (err) {
            if (err.response?.data?.detail) {
                const detail = err.response.data.detail;
                setError(Array.isArray(detail) ? detail.map(d => d.msg).join(", ") : detail);
            } else {
                setError("Невірний email або пароль.");
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState); // Перемикаємо видимість пароля
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Логін</h2>

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
                    type={showPassword ? "text" : "password"} // Змінюємо тип поля в залежності від стану
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

            <button type="submit" style={styles.button}>Увійти</button>

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
