import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLessonById } from "../../api/lessons.jsx";
import Button from "../ui/Button.jsx";
import OwlModalButton from "../ui/OwlModalButton";
import { lessonPageStyles, modalStyles } from "../../styles/lessonStyles.js";

/**
 * Компонент `LessonPage` — сторінка окремого уроку з літерою.
 * Відображає медіа-контент (зображення, аудіо), опис, правила та інтерактивні елементи.
 * Використовується в освітньому додатку для дітей.
 */
export default function LessonPage() {
    const { lessonId } = useParams(); // Отримання ID уроку з URL
    const [lesson, setLesson] = useState(null); // Стан уроку
    const [loading, setLoading] = useState(true); // Стан завантаження
    const [error, setError] = useState(null); // Стан помилки
    const navigate = useNavigate(); // Навігація між сторінками
    const [showModal, setShowModal] = useState(true); // Стан модального вікна з правилами

    const API_BASE_URL = "http://127.0.0.1:8000/uploads"; // Базовий шлях до медіа-файлів

    /**
     * Форматує шлях до медіа-файлів для коректного відображення в браузері.
     * @param {string} path - Відносний шлях до файлу.
     * @returns {string|null} Повний шлях або null.
     */
    const normalizePath = (path) =>
        path ? `${API_BASE_URL}/${path.replace(/\\/g, "/")}` : null;

    /**
     * Завантажує дані уроку за його ID.
     */
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

    /**
     * Відтворює аудіофайл уроку (вимова літери).
     */
    const playAudio = () => {
        if (lesson && lesson.audio_file) {
            const audioUrl = normalizePath(lesson.audio_file);
            console.log("Граю аудіо:", audioUrl);
            const audio = new Audio(audioUrl);
            audio.play().catch((e) => console.error("Помилка відтворення аудіо:", e));
        }
    };

    return (
        <div style={lessonPageStyles.mainContainer}>
            {/* 🦉 Модальне вікно з правилами */}
            {showModal && lesson?.regulations && (
                <div style={modalStyles.overlay}>
                    <div style={modalStyles.content}>
                        <img
                            src="/owl/OwlModal.png"
                            alt="Сова"
                            style={modalStyles.owlImage}
                        />
                        <h2>Привіт! Я Совеня</h2>
                        <div style={{ maxHeight: "60vh", overflowY: "auto", whiteSpace: "pre-wrap" }}>
                            {lesson.regulations
                                .split(/🔹|📌/)
                                .map((item, index) =>
                                    item.trim() ? (
                                        <p key={index} style={{ marginBottom: "5px" }}>
                                            {lesson.regulations.includes("📌" + item) ? "📌" : "🔹"} {item.trim()}
                                        </p>
                                    ) : null
                                )}
                        </div>
                        <button style={modalStyles.button} onClick={() => setShowModal(false)}>
                            Зрозуміло!
                        </button>
                    </div>
                </div>
            )}

            {/* Кнопка-сова, щоб повторно відкрити правила */}
            <OwlModalButton showModal={showModal} setShowModal={setShowModal} />

            <div style={lessonPageStyles.contentWrapper}>
                {/* Блок завантаження / помилки */}
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
                        {/* Заголовок сторінки */}
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

                        {/* Основний контент уроку */}
                        <div style={lessonPageStyles.mainContent}>
                            {/* Ліва колонка: літера, аудіо, тренування, вірші */}
                            <div style={lessonPageStyles.leftColumn}>
                                {/* Зображення літери */}
                                <div style={lessonPageStyles.letterBlock}>
                                    <h3 style={lessonPageStyles.blockTitle}>Літера та її написання</h3>
                                    {lesson.letter_image && (
                                        <img
                                            src={normalizePath(lesson.letter_image)}
                                            alt={`Літера ${lesson.letter_upper}`}
                                            style={lessonPageStyles.letterImage}
                                        />
                                    )}
                                </div>

                                {/* Аудіо для прослуховування звуку літери */}
                                {lesson.audio_file && (
                                    <div style={lessonPageStyles.audioBlock}>
                                        <h3 style={lessonPageStyles.audioBlockTitle}>Як звучить ця літера:</h3>
                                        <div style={lessonPageStyles.audioButtonWrapper}>
                                            <Button
                                                onClick={playAudio}
                                                text="▶️ Послухати"
                                                color="#9C27B0"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Блок з тренуванням (вимова, вправи) */}
                                {lesson.training && (
                                    <div style={lessonPageStyles.infoBlock}>
                                        <h3 style={lessonPageStyles.infoBlockTitle}>Вчимо звуки:</h3>
                                        {lesson.training.split("\\n").map((line, index) => (
                                            <p key={index} style={lessonPageStyles.infoBlockText}>
                                                {line.trim()}
                                            </p>
                                        ))}
                                    </div>
                                )}

                                {/* Блок з віршами / описом */}
                                {lesson.description && (
                                    <div style={lessonPageStyles.infoBlock}>
                                        <h3 style={lessonPageStyles.infoBlockTitle}>Віршики:</h3>
                                        {lesson.description.split("\\n").map((line, index) => (
                                            <p key={index} style={lessonPageStyles.infoBlockText}>
                                                {line.trim()}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Права колонка: зображення предметів */}
                            <div style={lessonPageStyles.rightColumn}>
                                <h3 style={lessonPageStyles.objectsTitle}>
                                    Предмети на літеру {lesson.letter_upper}:
                                </h3>

                                {[lesson.object_image_first, lesson.object_image_second, lesson.object_image_third]
                                    .filter(Boolean)
                                    .map((img, index) => (
                                        <div key={index} style={lessonPageStyles.objectImageContainer}>
                                            <div style={lessonPageStyles.objectImageWrapper}>
                                                <img
                                                    src={normalizePath(img)}
                                                    alt={`Предмет на літеру ${lesson.letter_upper}`}
                                                    style={lessonPageStyles.objectImage}
                                                />
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </>
                ) : (
                    // Якщо урок не знайдено
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
