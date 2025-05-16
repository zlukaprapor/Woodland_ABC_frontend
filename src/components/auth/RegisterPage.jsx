import React from "react";
import AuthForm from "./AuthForm.jsx";
import {registerPageStyles} from "../../styles/authStyles.js";

export default function RegisterPage() {
    return (
        <div style={registerPageStyles.container}>
            <div style={registerPageStyles.card}>
                <AuthForm isLogin={false}/>
            </div>
        </div>
    );
}