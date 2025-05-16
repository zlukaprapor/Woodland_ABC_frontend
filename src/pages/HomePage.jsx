import React from "react";
import {useNavigate} from "react-router-dom";
import Button from "../components/ui/Button.jsx";
import {homePageStyles} from "../styles/pagesStyles.js";

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div style={homePageStyles.pageContainer}>
            <div style={homePageStyles.welcomeCard}>
                <h1 style={homePageStyles.welcomeTitle}>👋 Вітаємо у "Лісовій абетці"!</h1>
                <p style={homePageStyles.welcomeSubtitle}>Навчайся граючись 🌲🦊</p>
                <Button onClick={() => navigate("/register")} text="Реєстрація"/>
                <Button onClick={() => navigate("/login")} text="Увійти" color="#66bb6a"/>
            </div>
        </div>
    );
}