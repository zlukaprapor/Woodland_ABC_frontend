import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLessons, deleteLesson } from "../../api/lessons.jsx";
import LessonCard from "./LessonCard.jsx";
import Button from "../../components/Button.jsx";

export default function LessonsListPage() {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("");
    const [pagination, setPagination] = useState({
        skip: 0,
        limit: 10,
        hasMore: true
    });

    const navigate = useNavigate();

    // Функція для завантаження уроків
    const loadLessons = async (reset = false) => {
        try {
            setLoading(true);

            const params = {
                skip: reset ? 0 : pagination.skip,
                limit: pagination.limit,
                letter_filter: filter || undefined
            };

            const items = await getLessons(params);

            if (reset) {
                setLessons(items);
            } else {
                setLessons(prev => [...prev, ...items]);
            }

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

    // Початкове завантаження
    useEffect(() => {
        loadLessons(true);
    }, []);

    // Завантаження при зміні фільтра
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        loadLessons(true);
    };

    // Видалення уроку
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
            <div style={styles.header}>
                <h1>Управління уроками</h1>
                <Button
                    onClick={() => navigate("/admin/lessons/create")}
                    text="Створити новий урок"
                    color="#4caf50"
                />
            </div>

            <div style={styles.filterSection}>
                <form onSubmit={handleFilterSubmit} style={styles.filterForm}>
                    <input
                        type="text"
                        value={filter}
                        onChange={handleFilterChange}
                        placeholder="Фільтр за літерою"
                        style={styles.filterInput}
                    />
                    <Button type="submit" text="Фільтрувати" color="#2196f3" />
                </form>
            </div>

            {error && <p style={styles.error}>{error}</p>}

            <div style={styles.lessonsList}>
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

            {pagination.hasMore && (
                <div style={styles.loadMoreContainer}>
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

const styles = {
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
    },
    filterSection: {
        marginBottom: "20px",
    },
    filterForm: {
        display: "flex",
        gap: "10px",
    },
    filterInput: {
        padding: "12px",
        borderRadius: "5px",
        border: "1px solid #ddd",
        flex: 1,
    },
    lessonsList: {
        marginTop: "20px",
    },
    error: {
        color: "#f44336",
        padding: "10px",
        backgroundColor: "#ffebee",
        borderRadius: "5px",
        marginBottom: "20px",
    },
    loadMoreContainer: {
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
        marginBottom: "40px",
    },
};
