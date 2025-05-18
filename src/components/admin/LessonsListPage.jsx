import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLessons, deleteLesson } from "../../api/lessons.jsx";
import LessonCard from "./LessonCard.jsx";
import Button from "../ui/Button.jsx";
import {adminStyles} from "../../styles/adminStyles.js";

/**
 * Компонент сторінки списку уроків для адміністратора.
 * Відображає перелік уроків з можливістю фільтрації, пагінації,
 * а також створення, видалення та навігації між сторінками.
 *
 * Особливості:
 * - Завантаження уроків з API з підтримкою пагінації.
 * - Фільтрація уроків за літерою.
 * - Видалення уроків.
 * - Навігація на сторінки створення уроку та назад до адмін-панелі.
 *
 * @component
 * @returns {JSX.Element} UI сторінки зі списком уроків та керуванням ними.
 */

export default function LessonsListPage() {
    // Стан для збереження списку уроків
    const [lessons, setLessons] = useState([]);

    // Стан для індикації процесу завантаження
    const [loading, setLoading] = useState(true);

    // Стан для збереження помилки завантаження або дій
    const [error, setError] = useState(null);

    // Стан для збереження значення фільтру за літерою
    const [filter, setFilter] = useState("");

    // Стан для пагінації: скіп, ліміт та чи є ще уроки для завантаження
    const [pagination, setPagination] = useState({
        skip: 0,
        limit: 10,
        hasMore: true
    });

    // Хук для навігації між сторінками (React Router)
    const navigate = useNavigate();

    /**
     * Завантажує уроки з API.
     * Якщо reset=true, замінює список уроків (початкове або фільтроване завантаження),
     * інакше додає до існуючого списку (пагінація).
     *
     * @param {boolean} reset - скинути список уроків і почати з початку
     */
    const loadLessons = async (reset = false) => {
        try {
            setLoading(true);
            setError(null);

            // Параметри запиту до API: пропускаємо перші skip записів, ліміт, фільтр за літерою
            const params = {
                skip: reset ? 0 : pagination.skip,
                limit: pagination.limit,
                letter_filter: filter || undefined
            };

            // Виклик API для отримання уроків
            const items = await getLessons(params);

            // Якщо скидаємо список (новий фільтр), замінюємо lessons, інакше додаємо нові
            if (reset) {
                setLessons(items);
            } else {
                setLessons(prev => [...prev, ...items]);
            }

            // Оновлюємо пагінацію: збільшуємо skip, визначаємо чи є ще уроки
            setPagination(prev => ({
                ...prev,
                skip: reset ? pagination.limit : prev.skip + prev.limit,
                hasMore: items.length === prev.limit
            }));
        } catch (err) {
            setError("Не вдалося завантажити уроки");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Завантажує уроки при першому рендері компонента.
     */
    useEffect(() => {
        loadLessons(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Оновлює стан фільтру при зміні текстового поля.
     * @param {React.ChangeEvent<HTMLInputElement>} e
     */
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    /**
     * Обробник сабміту форми фільтрації.
     * Запускає повторне завантаження уроків із новим фільтром.
     * @param {React.FormEvent<HTMLFormElement>} e
     */
    const handleFilterSubmit = (e) => {
        e.preventDefault();
        loadLessons(true);
    };

    /**
     * Видаляє урок за його ID через API та оновлює стан.
     * @param {number|string} lessonId - ID уроку, який треба видалити
     * @throws Якщо видалення не вдалося, викидає помилку
     */
    const handleDeleteLesson = async (lessonId) => {
        try {
            await deleteLesson(lessonId);
            setLessons(prev => prev.filter(lesson => lesson.id !== lessonId));
        } catch (err) {
            console.error("Помилка при видаленні уроку:", err);
            throw err;
        }
    };

    return (
        <div>
            {/* Хедер сторінки з заголовком та кнопками */}
            <div style={adminStyles.header}>
                <h1>Управління уроками</h1>
                <div style={adminStyles.buttonContainer}>
                    <Button
                        onClick={() => navigate("/admin/lessons/create")}
                        text="Створити новий урок"
                        color="#4caf50"
                    />
                    <Button
                        onClick={() => navigate("/admin")}
                        text="Повернутись"
                        color="#4caf50"
                    />
                </div>
            </div>

            {/* Фільтр за літерою */}
            <div style={adminStyles.filterSection}>
                <form onSubmit={handleFilterSubmit} style={adminStyles.filterForm}>
                    <input
                        type="text"
                        value={filter}
                        onChange={handleFilterChange}
                        placeholder="Фільтр за літерою"
                        style={adminStyles.filterInput}
                    />
                    <Button type="submit" text="Фільтрувати" color="#2196f3" />
                </form>
            </div>

            {/* Відображення помилки, якщо є */}
            {error && <p style={adminStyles.error}>{error}</p>}

            {/* Список уроків */}
            <div style={adminStyles.lessonsList}>
                {lessons.length === 0 && !loading ? (
                    <p>Уроки не знайдено</p>
                ) : (
                    lessons.map(lesson => (
                        <LessonCard
                            key={lesson.id}
                            lesson={lesson}
                            onDelete={handleDeleteLesson}
                        />
                    ))
                )}
            </div>

            {/* Кнопка завантажити більше, якщо є ще уроки */}
            {pagination.hasMore && (
                <div style={adminStyles.loadMoreContainer}>
                    <Button
                        onClick={() => loadLessons()}
                        text={loading ? "Завантаження..." : "Завантажити більше"}
                        disabled={loading}
                        color="#9e9e9e"
                    />
                </div>
            )}
        </div>
    );
}
