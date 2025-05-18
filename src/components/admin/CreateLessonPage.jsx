import React from "react";
import { useNavigate } from "react-router-dom";
import LessonForm from "./LessonForm.jsx";
import { createLesson } from "../../api/lessons.jsx";
import { adminStyles } from "../../styles/adminStyles.js";

/**
 * Компонент CreateLessonPage
 *
 * Сторінка для створення нового уроку в адміністративній панелі.
 * Включає заголовок, кнопку повернення до списку уроків та форму створення уроку.
 *
 * При відправці форми викликається функція `createLesson`, яка надсилає дані на сервер.
 * Після успішного створення уроку відбувається перенаправлення користувача назад
 * до списку уроків з невеликою затримкою.
 */

export default function CreateLessonPage() {
    // Хук для навігації між сторінками
    const navigate = useNavigate();

    /**
     * Обробник відправки форми створення уроку.
     *
     * @param {Object} formData - Дані, зібрані з форми (наприклад, назва, опис, зображення, аудіо тощо).
     * @returns {Promise<Object>} - Результат створення уроку (відповідь сервера).
     * @throws {Error} - У випадку помилки виводиться в консоль і пробрасується далі.
     */
    const handleSubmit = async (formData) => {
        try {
            const result = await createLesson(formData);
            // Затримка перед перенаправленням для UX (можливо, для анімації або підтвердження)
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
            {/* Заголовок сторінки та кнопка повернення */}
            <div style={adminStyles.header}>
                <h1>Створення нового уроку</h1>
                <button
                    onClick={() => navigate("/admin/lessons")}
                    style={adminStyles.backButton}
                >
                    ← Назад до списку
                </button>
            </div>

            {/* Компонент форми створення уроку */}
            <div style={adminStyles.formContainer}>
                <LessonForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
}
