import React from "react";
import AuthForm from "../components/AuthForm";
import { pageStyles } from "../styles/commonStyles";

export default function RegisterPage() {
    return (
        <div style={pageStyles.container}>
            <div style={pageStyles.card}>
                <AuthForm isLogin={false} />
            </div>
        </div>
    );
}