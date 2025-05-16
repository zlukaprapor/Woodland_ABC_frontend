import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import LessonForm from "./LessonForm.jsx";
import {getLessonById, updateLesson} from "../../api/lessons.jsx";
import {adminStyles} from "../../styles/adminStyles.js";

export default function EditLessonPage() {
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {lessonId} = useParams();
    const navigate = useNavigate();

    // Завантаження даних уроку
    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const data = await getLessonById(lessonId);
                setLesson(data);
            } catch (err) {
                setError("Не вдалося завантажити дані уроку");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLesson();
    }, [lessonId]);

    const handleSubmit = async (formData) => {
        try {
            const result = await updateLesson(lessonId, formData);
            setTimeout(() => {
                navigate("/admin/lessons");
            }, 1500);
            return result;
        } catch (error) {
            console.error("Помилка при оновленні уроку:", error);
            throw error;
        }
    };

    if (loading) {
        return <div>Завантаження...</div>;
    }

    if (error) {
        return <div style={{color: "red"}}>{error}</div>;
    }

    return (
        <div style={adminStyles.container}>
            <div style={adminStyles.header}>
                <h1>Редагування уроку</h1>
                <button
                    onClick={() => navigate("/admin/lessons")}
                    style={adminStyles.backButton}
                >
                    ← Назад до списку
                </button>
            </div>

            <div style={adminStyles.formContainer}>
                {lesson && (
                    <LessonForm
                        initialData={lesson}
                        onSubmit={handleSubmit}
                        isEditing={true}
                    />
                )}
            </div>
        </div>
    );
}