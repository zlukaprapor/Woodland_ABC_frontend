import React from "react";
import {statusMessageStyles} from "../../styles/authStyles.js";

export default function StatusMessage({error, success}) {
    if (error) {
        return <p style={statusMessageStyles.error}>🚫 {error}</p>;
    }

    if (success) {
        return <p style={statusMessageStyles.success}>✅ {success}</p>;
    }

    return null;
}