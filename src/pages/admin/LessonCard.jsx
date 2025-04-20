import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button.jsx";

export default function LessonCard({ lesson, onDelete }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/admin/lessons/edit/${lesson.id}`);
    };

    const handleDelete = async () => {
        if (window.confirm(`Ви впевнені, що хочете видалити урок для літери "${lesson.letter_upper}"?`)) {
            setIsDeleting(true);
            try {
                await onDelete(lesson.id);
            } catch (error) {
                alert("Помилка при видаленні уроку");
                console.error(error);
            } finally {
                setIsDeleting(false);
            }
        }
    };

    const API_BASE_URL = "http://127.0.0.1:8000/uploads";

    const normalizePath = (path) =>
        path ? `${API_BASE_URL}/${path.replace(/\\/g, "/")}` : null;

    return (
        <div style={styles.card}>
            <div style={styles.letterSection}>
                <div style={styles.letter}>{lesson.letter_upper}</div>
                <div style={styles.letterSmall}>{lesson.letter_lower}</div>
            </div>

            <div style={styles.content}>
                <h3 style={styles.title}>Урок: "{lesson.letter_upper}"</h3>
                <p style={styles.description}>{lesson.description}</p>

                <div style={styles.mediaInfo}>
                    <div style={styles.mediaItem}>
                        <strong>Зображення літери:</strong>
                        {lesson.letter_image ? (
                            <div style={styles.mediaPreview}>
                                <img
                                    src={normalizePath(lesson.letter_image)}
                                    alt={`Літера ${lesson.letter_upper}`}
                                    style={styles.thumbnail}
                                />
                            </div>
                        ) : "Немає"}
                    </div>

                    <div style={styles.mediaItem}>
                        <strong>Зображення об'єкта:</strong>
                        {lesson.object_image ? (
                            <div style={styles.mediaPreview}>
                                <img
                                    src={normalizePath(lesson.object_image)}
                                    alt={`Об'єкт на літеру ${lesson.letter_upper}`}
                                    style={styles.thumbnail}
                                />
                            </div>
                        ) : "Немає"}
                    </div>

                    <div style={styles.mediaItem}>
                        <strong>Аудіо:</strong>
                        {lesson.audio_file ? (
                            <div style={styles.mediaPreview}>
                                <audio
                                    controls
                                    src={normalizePath(lesson.audio_file)}
                                    style={styles.audio}
                                >
                                    Ваш браузер не підтримує елемент audio.
                                </audio>
                            </div>
                        ) : "Немає"}
                    </div>
                </div>
            </div>

            <div style={styles.actions}>
                <Button
                    onClick={handleEdit}
                    text="Редагувати"
                    color="#2196f3"
                    style={{ marginRight: "10px" }}
                />
                <Button
                    onClick={handleDelete}
                    text={isDeleting ? "Видалення..." : "Видалити"}
                    color="#f44336"
                    disabled={isDeleting}
                />
            </div>
        </div>
    );
}

const styles = {
    card: {
        display: "flex",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        padding: "20px",
        marginBottom: "20px",
        position: "relative",
    },
    letterSection: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "80px",
        borderRight: "1px solid #eee",
        paddingRight: "20px",
        marginRight: "20px",
    },
    letter: {
        fontSize: "48px",
        fontWeight: "bold",
        color: "#ff7043",
    },
    letterSmall: {
        fontSize: "28px",
        color: "#ff7043",
    },
    content: {
        flex: 1,
    },
    title: {
        marginTop: 0,
        marginBottom: "10px",
        color: "#333",
    },
    description: {
        fontSize: "16px",
        color: "#666",
        margin: "0 0 10px 0",
    },
    mediaInfo: {
        fontSize: "14px",
        color: "#777",
        marginTop: "15px",
    },
    mediaItem: {
        marginBottom: "10px",
    },
    mediaPreview: {
        marginTop: "5px",
        display: "inline-block",
        verticalAlign: "middle",
    },
    thumbnail: {
        width: "60px",
        height: "60px",
        objectFit: "cover",
        borderRadius: "4px",
        marginLeft: "10px",
        border: "1px solid #ddd",
    },
    audio: {
        height: "30px",
        marginLeft: "10px",
        verticalAlign: "middle",
    },
    actions: {
        display: "flex",
        alignItems: "center",
    },
};
