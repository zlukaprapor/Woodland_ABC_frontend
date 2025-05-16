import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {getLessonById} from "../../api/lessons.jsx";
import Button from "../ui/Button.jsx";
import {lessonPageStyles} from "../../styles/lessonStyles.js";

export default function LessonPage() {
    const {lessonId} = useParams();
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
        <div style={lessonPageStyles.mainContainer}>
            <div style={lessonPageStyles.contentWrapper}>
                {loading ? (
                    <div style={lessonPageStyles.loadingContainer}>
                        <div style={lessonPageStyles.loadingContent}>
                            <p style={lessonPageStyles.loadingText}>Завантаження уроку...</p>
                            <div style={lessonPageStyles.loadingIndicator}></div>
                        </div>
                    </div>
                ) : error ? (
                    <div style={lessonPageStyles.errorContainer}>
                        <div style={lessonPageStyles.errorContent}>
                            <p style={lessonPageStyles.errorMessage}>{error}</p>
                            <div style={lessonPageStyles.errorActions}>
                                <Button
                                    onClick={() => navigate("/dashboard")}
                                    text="⬅️ Повернутися до абетки"
                                    color="#66BB6A"
                                />
                            </div>
                        </div>
                    </div>
                ) : lesson ? (
                    <>
                        {/* Хедер з заголовком */}
                        <div style={lessonPageStyles.header}>
                            <h1 style={lessonPageStyles.headerTitle}>
                                Вивчаємо літеру {lesson?.letter_upper || "..."}
                            </h1>
                            <div style={lessonPageStyles.headerButtons}>
                                <Button
                                    onClick={() => navigate("/dashboard")}
                                    text="⬅️ До абетки"
                                    color="#66BB6A"
                                    style={lessonPageStyles.headerButtonStyle}
                                />
                                <Button
                                    onClick={() => navigate(`/quiz/${lessonId}`)}
                                    text="До тестування ➡️"
                                    color="#FFA726"
                                    style={lessonPageStyles.headerButtonStyle}
                                />
                            </div>
                        </div>

                        {/* Основний контент */}
                        <div style={lessonPageStyles.mainContent}>
                            {/* Ліва колонка */}
                            <div style={lessonPageStyles.leftColumn}>
                                {/* Блок з буквами */}
                                <div style={lessonPageStyles.letterBlock}>
                                    <h3 style={lessonPageStyles.blockTitle}>
                                        Літера та її написання
                                    </h3>

                                    {lesson.letter_image && (
                                        <img
                                            src={normalizePath(lesson.letter_image)}
                                            alt={`Літера ${lesson.letter_upper}`}
                                            style={lessonPageStyles.letterImage}
                                        />
                                    )}
                                </div>

                                {/* Блок з аудіо */}
                                {lesson.audio_file && (
                                    <div style={lessonPageStyles.audioBlock}>
                                        <h3 style={lessonPageStyles.audioBlockTitle}>
                                            Як звучить ця літера:
                                        </h3>
                                        <div style={lessonPageStyles.audioButtonWrapper}>
                                            <Button
                                                onClick={playAudio}
                                                text="▶️ Послухати"
                                                color="#9C27B0"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Додаткова інформація */}

                                {lesson.training && (
                                    <div style={lessonPageStyles.infoBlock}>
                                        <h3 style={lessonPageStyles.infoBlockTitle}>
                                            Вчимо звуки:
                                        </h3>
                                        <p style={lessonPageStyles.infoBlockText}>
                                            {lesson.training}
                                        </p>
                                    </div>
                                )}
                                {lesson.description && (
                                    <div style={lessonPageStyles.infoBlock}>
                                        <h3 style={lessonPageStyles.infoBlockTitle}>
                                            Віршики:
                                        </h3>
                                        <p style={lessonPageStyles.infoBlockText}>
                                            {lesson.description}
                                        </p>
                                    </div>
                                )}
                                {lesson.regulations && (
                                    <div style={lessonPageStyles.infoBlock}>
                                        <h3 style={lessonPageStyles.infoBlockTitle}>
                                            Правила:
                                        </h3>
                                        <p style={lessonPageStyles.infoBlockText}>
                                            {lesson.regulations}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Права колонка */}
                            <div style={lessonPageStyles.rightColumn}>
                                <h3 style={lessonPageStyles.objectsTitle}>
                                    Предмети на літеру {lesson.letter_upper}:
                                </h3>

                                {lesson.object_image_first && (
                                    <div style={lessonPageStyles.objectImageContainer}>
                                        <div style={lessonPageStyles.objectImageWrapper}>
                                            <img
                                                src={normalizePath(lesson.object_image_first)}
                                                alt={`Предмет на літеру ${lesson.letter_upper}`}
                                                style={lessonPageStyles.objectImage}
                                            />
                                        </div>
                                    </div>
                                )}
                                {lesson.object_image_second && (
                                    <div style={lessonPageStyles.objectImageContainer}>
                                        <div style={lessonPageStyles.objectImageWrapper}>
                                            <img
                                                src={normalizePath(lesson.object_image_second)}
                                                alt={`Предмет на літеру ${lesson.letter_upper}`}
                                                style={lessonPageStyles.objectImage}
                                            />
                                        </div>
                                    </div>
                                )}
                                {lesson.object_image_third && (
                                    <div style={lessonPageStyles.objectImageContainer}>
                                        <div style={lessonPageStyles.objectImageWrapper}>
                                            <img
                                                src={normalizePath(lesson.object_image_third)}
                                                alt={`Предмет на літеру ${lesson.letter_upper}`}
                                                style={lessonPageStyles.objectImage}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </>
                ) : (
                    <div style={lessonPageStyles.errorContainer}>
                        <div style={lessonPageStyles.errorContent}>
                            <p style={lessonPageStyles.loadingText}>Урок не знайдено</p>
                            <div style={lessonPageStyles.errorActions}>
                                <Button
                                    onClick={() => navigate("/dashboard")}
                                    text="⬅️ Повернутися до абетки"
                                    color="#66BB6A"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}