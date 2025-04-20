import React from "react";
import { formStyles } from "../styles/commonStyles";

export default function StatusMessage({ error, success }) {
    if (error) {
        return <p style={formStyles.error}>🚫 {error}</p>;
    }

    if (success) {
        return <p style={formStyles.success}>✅ {success}</p>;
    }

    return null;
}