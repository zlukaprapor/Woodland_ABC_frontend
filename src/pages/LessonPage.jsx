import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLessonById } from "../api/lessons";
import Button from "../components/Button";
import { pageStyles } from "../styles/commonStyles";

export default function LessonPage() {
    const { lessonId } = useParams();
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const API_BASE_URL = "http://127.0.0.1:8000/uploads";

    // Функція для правильного форматування шляху до медіа-файлів
    const normalizePath = (path) =>
        path ? `${API_BASE_URL}/${path.replace(/\\/g, "/")}` : null;

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                console.log("Отримую урок з ID:", lessonId);
                const data = await getLessonById(lessonId);
                console.log("Отримані дані уроку:", data);
                setLesson(data);
                setLoading(false);
            } catch (err) {
                console.error("Помилка при завантаженні уроку:", err);
                setError("Не вдалося завантажити урок. Спробуйте пізніше.");
                setLoading(false);
            }
        };

        fetchLesson();
    }, [lessonId]);

    // Функція для відтворення аудіо
    const playAudio = () => {
        if (lesson && lesson.audio_file) {
            const audioUrl = normalizePath(lesson.audio_file);
            console.log("Граю аудіо:", audioUrl);
            const audio = new Audio(audioUrl);
            audio.play().catch(e => console.error("Помилка відтворення аудіо:", e));
        }
    };

    return (
        <div style={{
            ...pageStyles.container,
            backgroundColor: "#E8F5E9",
            minHeight: "100vh",
            padding: "20px"
        }}>
            <div style={{
                ...pageStyles.card,
                width: "90%",
                maxWidth: "600px",
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
                padding: "30px",
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
            }}>
                {loading ? (
                    <div style={{ textAlign: "center", padding: "20px" }}>
                        <p>Завантаження уроку...</p>
                        <div style={{
                            borderTop: "5px dotted #AED581",
                            margin: "10px auto",
                            width: "50px"
                        }}></div>
                    </div>
                ) : error ? (
                    <div style={{ textAlign: "center", padding: "20px" }}>
                        <p style={{ color: "red" }}>{error}</p>
                        <Button
                            onClick={() => navigate("/dashboard")}
                            text="🔙 Повернутися до абетки"
                            color="#66BB6A"
                            style={{ marginTop: "20px" }}
                        />
                    </div>
                ) : lesson ? (
                    <>
                        <h1 style={{
                            ...pageStyles.title,
                            color: "#2E7D32",
                            fontSize: "48px",
                            marginBottom: "20px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "10px"
                        }}>
                            <span style={{
                                display: "inline-block",
                                backgroundColor: "#FFEB3B",
                                borderRadius: "12px",
                                padding: "5px 15px",
                                border: "3px solid #FFC107"
                            }}>
                                {lesson.letter_upper}
                            </span>
                            <span style={{
                                display: "inline-block",
                                backgroundColor: "#E8F5E9",
                                borderRadius: "12px",
                                padding: "5px 15px",
                                border: "3px solid #AED581",
                                fontSize: "36px"
                            }}>
                                {lesson.letter_lower}
                            </span>
                        </h1>

                        <div style={{
                            marginBottom: "30px",
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px"
                        }}>
                            {lesson.letter_image && (
                                <div style={{
                                    padding: "15px",
                                    backgroundColor: "#FFF8E1",
                                    borderRadius: "12px",
                                    border: "2px dashed #FFD54F"
                                }}>
                                    <h3 style={{ color: "#5D4037", marginBottom: "10px" }}>
                                        Так виглядає літера:
                                    </h3>
                                    <img
                                        src={normalizePath(lesson.letter_image)}
                                        alt={`Літера ${lesson.letter_upper}`}
                                        style={{
                                            maxWidth: "100%",
                                            maxHeight: "150px",
                                            border: "3px solid #FFC107",
                                            borderRadius: "10px",
                                            backgroundColor: "white"
                                        }}
                                    />
                                </div>
                            )}

                            {lesson.object_image && (
                                <div style={{
                                    padding: "15px",
                                    backgroundColor: "#E3F2FD",
                                    borderRadius: "12px",
                                    border: "2px dashed #64B5F6"
                                }}>
                                    <h3 style={{ color: "#5D4037", marginBottom: "10px" }}>
                                        Предмет на літеру {lesson.letter_upper}:
                                    </h3>
                                    <img
                                        src={normalizePath(lesson.object_image)}
                                        alt={`Предмет на літеру ${lesson.letter_upper}`}
                                        style={{
                                            maxWidth: "100%",
                                            maxHeight: "200px",
                                            border: "3px solid #64B5F6",
                                            borderRadius: "10px",
                                            backgroundColor: "white"
                                        }}
                                    />
                                </div>
                            )}

                            {lesson.audio_file && (
                                <div style={{
                                    padding: "15px",
                                    backgroundColor: "#F3E5F5",
                                    borderRadius: "12px",
                                    border: "2px dashed #CE93D8"
                                }}>
                                    <h3 style={{ color: "#5D4037", marginBottom: "10px" }}>
                                        Як звучить ця літера:
                                    </h3>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <Button
                                            onClick={playAudio}
                                            text="▶️ Послухати"
                                            color="#9C27B0"
                                        />
                                    </div>
                                    <audio
                                        controls
                                        src={normalizePath(lesson.audio_file)}
                                        style={{
                                            width: "100%",
                                            marginTop: "10px"
                                        }}
                                    >
                                        Ваш браузер не підтримує елемент audio.
                                    </audio>
                                </div>
                            )}
                        </div>

                        {lesson.description && (
                            <div style={{
                                backgroundColor: "#F1F8E9",
                                padding: "15px",
                                borderRadius: "10px",
                                marginBottom: "20px",
                                border: "2px dashed #AED581"
                            }}>
                                <h3 style={{ color: "#33691E", marginBottom: "10px" }}>
                                    Цікаво знати:
                                </h3>
                                <p style={{ color: "#33691E" }}>
                                    {lesson.description}
                                </p>
                            </div>
                        )}

                        <div style={{ textAlign: "center", marginTop: "20px" }}>
                            <Button
                                onClick={() => navigate("/dashboard")}
                                text="🔙 Повернутися до абетки"
                                color="#66BB6A"
                            />
                        </div>
                    </>
                ) : (
                    <div style={{ textAlign: "center", padding: "20px" }}>
                        <p>Урок не знайдено</p>
                        <Button
                            onClick={() => navigate("/dashboard")}
                            text="🔙 Повернутися до абетки"
                            color="#66BB6A"
                            style={{ marginTop: "20px" }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}