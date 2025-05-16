import React from "react";
import AuthForm from "./AuthForm.jsx";
import {loginPageStyles} from "../../styles/authStyles.js";

export default function LoginPage() {
    return (
        <div style={loginPageStyles.container}>
            <div style={loginPageStyles.card}>
                <AuthForm isLogin={true} />
            </div>
        </div>
    );
}