import React from "react";
import {statusMessageStyles} from "../../styles/authStyles.js";

/**
 * Компонент `StatusMessage` — відображає повідомлення про помилку або успіх.
 *
 * Призначений для інформування користувача про результати дій, наприклад, авторизації чи реєстрації.
 * Показує відповідне повідомлення у стилізованому вигляді.
 *
 * @param {Object} props - Вхідні пропси.
 * @param {string|null} props.error - Повідомлення про помилку. Якщо передано, воно буде відображене з червоним стилем.
 * @param {string|null} props.success - Повідомлення про успішну дію. Якщо передано, воно буде відображене з зеленим стилем.
 * @returns {JSX.Element|null} Відповідне повідомлення або `null`, якщо нічого не потрібно відображати.
 */
export default function StatusMessage({error, success}) {
    if (error) {
        return <p style={statusMessageStyles.error}>🚫 {error}</p>;
    }

    if (success) {
        return <p style={statusMessageStyles.success}>✅ {success}</p>;
    }

    return null;
}
