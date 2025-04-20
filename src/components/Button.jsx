import React from "react";

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