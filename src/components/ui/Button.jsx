import React from "react";

/**
 * Кастомна кнопка з настроюваним стилем і кольором.
 *
 * @component
 * @param {Object} props - Вхідні параметри компонента.
 * @param {Function} props.onClick - Обробник події натискання на кнопку.
 * @param {string} props.text - Текст, який буде відображено на кнопці.
 * @param {string} [props.color="#ffb74d"] - Колір фону кнопки (за замовчуванням помаранчевий).
 * @param {React.CSSProperties} [props.style] - Додаткові стилі, які об'єднуються з базовими.
 * @param {...any} props.props - Будь-які інші додаткові пропси (наприклад, disabled, type).
 *
 * @returns {JSX.Element} Відрендерена кнопка з заданими властивостями.
 */
export default function Button({ onClick, text, color = "#ffb74d", style, ...props }) {
    const buttonStyle = {
        backgroundColor: color,
        border: "none",
        borderRadius: "12px",
        padding: "12px 24px",
        margin: "10px",
        color: "white",
        fontSize: "1.1rem",
        cursor: "pointer",
        transition: "0.3s",
        ...style,
    };

    return (
        <button onClick={onClick} style={buttonStyle} {...props}>
            {text}
        </button>
    );
}
