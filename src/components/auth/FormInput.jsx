import React, {useState} from "react";
import {formInputStyles} from "../../styles/authStyles.js";
import {FaEye, FaEyeSlash} from "react-icons/fa";

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