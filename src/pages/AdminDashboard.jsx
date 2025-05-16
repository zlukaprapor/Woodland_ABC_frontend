import React from "react";
import {useNavigate} from "react-router-dom";
import Button from "../components/ui/Button.jsx";
import {logout} from "../services/authService";
import {adminDashboardStyles} from "../styles/pagesStyles.js";

export default function AdminDashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div style={adminDashboardStyles.pageContainer}>
            <div style={adminDashboardStyles.navHeader}>
                <h1 style={adminDashboardStyles.pageTitle}>👑 Адмін Панель</h1>
                <Button
                    onClick={handleLogout}
                    text="Вийти"
                    color="#f44336"
                />
            </div>

            <p style={adminDashboardStyles.welcomeMessage}>Вітаємо, пане Адміністраторе!</p>

            <div style={adminDashboardStyles.menuGrid}>
                <div style={adminDashboardStyles.menuItem} onClick={() => navigate("/admin/lessons")}>
                    <h2>📚 Управління уроками</h2>
                    <p>Створення, редагування та видалення уроків</p>
                </div>

                {/* Можна додати інші модулі адміністрування */}
                <div style={adminDashboardStyles.menuItem}>
                    <h2>👤 Користувачі</h2>
                    <p>Управління користувачами та їх правами</p>
                </div>

                <div style={adminDashboardStyles.menuItem}>
                    <h2>📊 Статистика</h2>
                    <p>Перегляд статистики використання додатку</p>
                </div>
            </div>
        </div>
    );
}