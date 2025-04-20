import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LessonForm from "./LessonForm.jsx";
import { getLessonById, updateLesson } from "../../api/lessons.jsx";

export default function EditLessonPage() {
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { lessonId } = useParams();
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
        return <div style={{ color: "red" }}>{error}</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1>Редагування уроку</h1>
                <button
                    onClick={() => navigate("/admin/lessons")}
                    style={styles.backButton}
                >
                    ← Назад до списку
                </button>
            </div>

            <div style={styles.formContainer}>
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