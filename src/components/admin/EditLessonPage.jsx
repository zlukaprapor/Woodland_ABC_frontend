import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LessonForm from "./LessonForm.jsx";
import { getLessonById, updateLesson } from "../../api/lessons.jsx";
import { adminStyles } from "../../styles/adminStyles.js";

/**
 * Компонент EditLessonPage
 *
 * Сторінка для редагування наявного уроку в адміністративній панелі.
 * Завантажує урок за його ID, показує форму з попередньо заповненими даними,
 * дозволяє змінити ці дані й зберегти оновлення.
 *
 * При відправці форми викликається функція `updateLesson`, яка надсилає оновлені дані на сервер.
 * Після успішного оновлення відбувається перенаправлення користувача назад до списку уроків.
 */


export default function EditLessonPage() {
    // Локальний стан: урок, завантаження, помилка
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Витягуємо lessonId з параметрів маршруту
    const { lessonId } = useParams();

    // Навігація між сторінками
    const navigate = useNavigate();

    /**
     * Завантаження даних уроку при монтуванні компонента.
     * Використовує getLessonById для отримання уроку за ID.
     */
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

    /**
     * Обробник надсилання форми оновлення уроку.
     *
     * @param {Object} formData - Оновлені дані з форми.
     * @returns {Promise<Object>} - Результат оновлення уроку.
     * @throws {Error} - У випадку помилки вона логуються та пробрасується.
     */
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

    // Показати повідомлення про завантаження
    if (loading) {
        return <div>Завантаження...</div>;
    }

    // Показати повідомлення про помилку, якщо урок не вдалося завантажити
    if (error) {
        return <div style={{ color: "red" }}>{error}</div>;
    }

    return (
        <div style={adminStyles.container}>
            {/* Заголовок сторінки та кнопка повернення */}
            <div style={adminStyles.header}>
                <h1>Редагування уроку</h1>
                <button
                    onClick={() => navigate("/admin/lessons")}
                    style={adminStyles.backButton}
                >
                    ← Назад до списку
                </button>
            </div>

            {/* Форма редагування уроку, з початковими даними */}
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
