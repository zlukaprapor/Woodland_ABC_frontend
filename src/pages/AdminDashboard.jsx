import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { logout } from "../services/authService";

export default function AdminDashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>👑 Адмін Панель</h1>
                <Button
                    onClick={handleLogout}
                    text="Вийти"
                    color="#f44336"
                />
            </div>

            <p style={styles.welcome}>Вітаємо, пане Адміністраторе!</p>

            <div style={styles.menuCards}>
                <div style={styles.menuCard} onClick={() => navigate("/admin/lessons")}>
                    <h2>📚 Управління уроками</h2>
                    <p>Створення, редагування та видалення уроків</p>
                </div>

                {/* Можна додати інші модулі адміністрування */}
                <div style={styles.menuCard}>
                    <h2>👤 Користувачі</h2>
                    <p>Управління користувачами та їх правами</p>
                </div>

                <div style={styles.menuCard}>
                    <h2>📊 Статистика</h2>
                    <p>Перегляд статистики використання додатку</p>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
    },
    title: {
        color: "#ff7043",
        margin: 0,
    },
    welcome: {
        fontSize: "18px",
        marginBottom: "30px",
    },
    menuCards: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "20px",
    },
    menuCard: {
        backgroundColor: "#fff",
        padding: "25px",
        borderRadius: "10px",
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
        },
    },
};