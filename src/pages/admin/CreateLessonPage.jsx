import React from "react";
import { useNavigate } from "react-router-dom";
import LessonForm from "./LessonForm.jsx";
import { createLesson } from "../../api/lessons.jsx";

export default function CreateLessonPage() {
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        try {
            const result = await createLesson(formData);
            setTimeout(() => {
                navigate("/admin/lessons");
            }, 1500);
            return result;
        } catch (error) {
            console.error("Помилка при створенні уроку:", error);
            throw error;
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1>Створення нового уроку</h1>
                <button
                    onClick={() => navigate("/admin/lessons")}
                    style={styles.backButton}
                >
                    ← Назад до списку
                </button>
            </div>

            <div style={styles.formContainer}>
                <LessonForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
    },
    backButton: {
        padding: "8px 16px",
        backgroundColor: "#f0f0f0",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "14px",
    },
    formContainer: {
        backgroundColor: "#fff",
        borderRadius: "8px",
        padding: "20px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    },
};