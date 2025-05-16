import React from "react";
import {useNavigate} from "react-router-dom";
import LessonForm from "./LessonForm.jsx";
import {createLesson} from "../../api/lessons.jsx";
import {adminStyles} from "../../styles/adminStyles.js";

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
        <div style={adminStyles.container}>
            <div style={adminStyles.header}>
                <h1>Створення нового уроку</h1>
                <button
                    onClick={() => navigate("/admin/lessons")}
                    style={adminStyles.backButton}
                >
                    ← Назад до списку
                </button>
            </div>

            <div style={adminStyles.formContainer}>
                <LessonForm onSubmit={handleSubmit}/>
            </div>
        </div>
    );
}