import React from "react";
import AuthForm from "./AuthForm.jsx";
import {loginPageStyles} from "../../styles/authStyles.js";

/**
 * Компонент `LoginPage` — сторінка входу користувача.
 *
 * Відображає форму авторизації, стилізовану як "картка", розміщену по центру екрана.
 * Використовує компонент `AuthForm` з прапорцем `isLogin = true`, що означає режим авторизації.
 *
 * @returns {JSX.Element} Розмітка сторінки логіну.
 */
export default function LoginPage() {
    return (
        <div style={loginPageStyles.container}>
            {/* Центрований контейнер з карткою форми входу */}
            <div style={loginPageStyles.card}>
                {/* Компонент форми входу (login mode) */}
                <AuthForm isLogin={true} />
            </div>
        </div>
    );
}
