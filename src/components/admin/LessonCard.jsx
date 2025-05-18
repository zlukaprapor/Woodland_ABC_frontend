import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button.jsx";
import { adminStyles } from "../../styles/adminStyles.js";

/**
 * Компонент LessonCard
 *
 * Відображає картку уроку з інформацією про урок, включно з літерами,
 * описом, зображеннями та аудіо.
 * Забезпечує кнопки для редагування та видалення уроку.
 *
 * Props:
 * - lesson: Об'єкт уроку з такими полями, як letter_upper, letter_lower, description,
 *   training, regulations, media (зображення, аудіо) тощо.
 * - onDelete: Функція, яка викликається для видалення уроку за його ID.
 */

export default function LessonCard({ lesson, onDelete }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    /**
     * Обробник переходу до сторінки редагування уроку.
     * Використовує navigate для переходу на сторінку редагування з ID уроку.
     */
    const handleEdit = () => {
        navigate(`/admin/lessons/edit/${lesson.id}`);
    };

    /**
     * Обробник видалення уроку.
     * Запитує підтвердження у користувача.
     * Викликає onDelete, якщо користувач підтвердив.
     * Відображає індикатор завантаження видалення.
     * В разі помилки показує alert і лог в консоль.
     */
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

    // Базова URL для завантаження медіафайлів
    const API_BASE_URL = "http://127.0.0.1:8000/uploads";

    /**
     * Нормалізує шлях до медіафайлу,
     * замінює зворотні слеші на прямі та додає базовий URL.
     * Якщо шлях відсутній, повертає null.
     *
     * @param {string} path - Відносний шлях до файлу.
     * @returns {string|null} Повний URL до файлу або null.
     */
    const normalizePath = (path) =>
        path ? `${API_BASE_URL}/${path.replace(/\\/g, "/")}` : null;

    return (
        <div style={adminStyles.card}>
            {/* Секція з великою та маленькою літерою */}
            <div style={adminStyles.letterSection}>
                <div style={adminStyles.letter}>{lesson.letter_upper}</div>
                <div style={adminStyles.letterSmall}>{lesson.letter_lower}</div>
            </div>

            {/* Основний контент картки: заголовок, опис, тренування, регламенти */}
            <div style={adminStyles.content}>
                <h3 style={adminStyles.title}>Урок: "{lesson.letter_upper}"</h3>
                <p style={adminStyles.description}>{lesson.description}</p>
                <p style={adminStyles.training}>{lesson.training}</p>
                <p style={adminStyles.regulations}>{lesson.regulations}</p>

                {/* Медіаінформація: зображення та аудіо */}
                <div style={adminStyles.mediaInfo}>
                    <div style={adminStyles.mediaItem}>
                        <strong>Зображення літери:</strong>
                        {lesson.letter_image ? (
                            <div style={adminStyles.mediaPreview}>
                                <img
                                    src={normalizePath(lesson.letter_image)}
                                    alt={`Літера ${lesson.letter_upper}`}
                                    style={adminStyles.thumbnail}
                                />
                            </div>
                        ) : "Немає"}
                    </div>

                    <div style={adminStyles.mediaItem}>
                        <strong>Перше зображення об'єкта на літеру:</strong>
                        {lesson.object_image_first ? (
                            <div style={adminStyles.mediaPreview}>
                                <img
                                    src={normalizePath(lesson.object_image_first)}
                                    alt={`Об'єкт на літеру ${lesson.letter_upper}`}
                                    style={adminStyles.thumbnail}
                                />
                            </div>
                        ) : "Немає"}
                    </div>

                    <div style={adminStyles.mediaItem}>
                        <strong>Друге зображення об'єкта на літеру:</strong>
                        {lesson.object_image_second ? (
                            <div style={adminStyles.mediaPreview}>
                                <img
                                    src={normalizePath(lesson.object_image_second)}
                                    alt={`Об'єкт на літеру ${lesson.letter_upper}`}
                                    style={adminStyles.thumbnail}
                                />
                            </div>
                        ) : "Немає"}
                    </div>

                    <div style={adminStyles.mediaItem}>
                        <strong>Третє зображення об'єкта на літеру:</strong>
                        {lesson.object_image_third ? (
                            <div style={adminStyles.mediaPreview}>
                                <img
                                    src={normalizePath(lesson.object_image_third)}
                                    alt={`Об'єкт на літеру ${lesson.letter_upper}`}
                                    style={adminStyles.thumbnail}
                                />
                            </div>
                        ) : "Немає"}
                    </div>

                    <div style={adminStyles.mediaItem}>
                        <strong>Аудіо:</strong>
                        {lesson.audio_file ? (
                            <div style={adminStyles.mediaPreview}>
                                <audio
                                    controls
                                    src={normalizePath(lesson.audio_file)}
                                    style={adminStyles.audio}
                                >
                                    Ваш браузер не підтримує елемент audio.
                                </audio>
                            </div>
                        ) : "Немає"}
                    </div>
                </div>
            </div>

            {/* Кнопки дій: редагувати, видалити */}
            <div style={adminStyles.actions}>
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
