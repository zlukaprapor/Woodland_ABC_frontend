import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth.jsx";
import { saveAuthData } from "../services/authService";

export default function LoginForm() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate(); // ✅ навігатор для редіректу

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const res = await loginUser(formData);
            const { access_token, user } = res;

            // зберігаємо токен + дані користувача в localStorage
            saveAuthData(access_token, user);

            setSuccess("Вхід успішний!");

            // редірект залежно від ролі
            setTimeout(() => {
                if (user.role === "admin") {
                    navigate("/admin", { replace: true });
                } else {
                    navigate("/dashboard", { replace: true });
                }
            }, 1000);
        } catch (err) {
            const detail = err.response?.data?.detail;
            setError(Array.isArray(detail) ? detail.map(d => d.msg).join(", ") : detail || "Невірний email або пароль.");
        }
    };


    const togglePasswordVisibility = () => setShowPassword(prev => !prev);

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

            <button type="submit" style={styles.button}>Увійти</button>

            {error && <p style={styles.error}>🚫 {error}</p>}
            {success && <p style={styles.success}>✅ {success}</p>}
        </form>
    );
}

const styles = {
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
