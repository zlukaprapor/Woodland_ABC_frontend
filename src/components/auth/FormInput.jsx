import React, {useState} from "react";
import {formInputStyles} from "../../styles/authStyles.js";
import {FaEye, FaEyeSlash} from "react-icons/fa";

/**
 * Компонент FormInput — універсальне поле вводу з підтримкою режиму пароля.
 * Якщо `isPassword` дорівнює true, додає кнопку для показу/приховування пароля.
 *
 * @param {string} type - тип поля вводу (text, email тощо)
 * @param {string} name - ім'я поля (name атрибут)
 * @param {string} value - поточне значення поля
 * @param {function} onChange - обробник зміни значення
 * @param {string} placeholder - текст-заповнювач
 * @param {boolean} required - чи є поле обов'язковим
 * @param {boolean} isPassword - чи є поле паролем
 */


export default function FormInput({
                                      type = "text",
                                      name,
                                      value,
                                      onChange,
                                      placeholder,
                                      required = false,
                                      isPassword = false
                                  }) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    // Якщо поле — парольне, показує кнопку
    if (isPassword) {
        return (
            <div style={formInputStyles.inputGroup}>
                <input
                    name={name}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    style={formInputStyles.input}
                    required={required}
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    style={formInputStyles.toggleButton}
                >
                    {showPassword ? <FaEyeSlash/> : <FaEye/>}
                </button>
            </div>
        );
    }

    // Звичайне текстове поле
    return (
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            style={formInputStyles.input}
            required={required}
        />
    );
}