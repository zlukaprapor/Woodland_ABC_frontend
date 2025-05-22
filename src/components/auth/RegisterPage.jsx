import React from "react";
import AuthForm from "./AuthForm.jsx";
import {registerPageStyles} from "../../styles/authStyles.js";

/**
 * Компонент `RegisterPage` — сторінка реєстрації нового користувача.
 *
 * Відображає форму реєстрації, стилізовану у вигляді "картки", розміщеної по центру.
 * Використовує компонент `AuthForm` з прапорцем `isLogin = false`, що активує режим реєстрації.
 *
 * @returns {JSX.Element} Розмітка сторінки реєстрації.
 */
export default function RegisterPage() {
    return (
        <div style={registerPageStyles.container}>
            {/* Центрований контейнер з карткою форми реєстрації */}
            <div style={registerPageStyles.card}>
                {/* Компонент форми з режимом реєстрації */}
                <AuthForm isLogin={false}/>
            </div>
        </div>
    );
}
