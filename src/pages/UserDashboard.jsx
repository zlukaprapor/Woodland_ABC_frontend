import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLessons } from "../api/lessons";
import { getProgress } from "../api/progress";
import { getAuthUser } from "../services/authService";
import { logout } from "../services/authService";
import { userDashboardStyles } from "../styles/pagesStyles.js";

/**
 * Компонент панелі користувача для відображення уроків з літер,
 * прогресу користувача та можливості переходу до уроків.
 *
 * Завантажує список уроків та прогрес користувача, відображає літери у
 * спеціальному порядку, блокує ті, які недоступні для вивчення,
 * дозволяє вийти з системи.
 *
 * @component
 * @returns {JSX.Element} Інтерфейс панелі користувача
 */
export default function UserDashboard() {
    const [letters, setLetters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Власний порядок літер для відображення
    const customLetterOrder = [
        'А', 'У', 'О', 'М', 'Н', 'И', 'І', 'С', 'Л', 'К', 'В',
        'Е', 'Р', 'П', 'Т', 'Ш', 'Д', 'З', 'Б', 'Г', 'Ґ', 'Ч',
        'Х', 'Ц', 'Й', 'Ь', 'Ж', 'Ї', 'Я', 'Є', 'Ю', 'Щ', 'Ф'
    ];

    useEffect(() => {
        const currentUser = getAuthUser();
        setUser(currentUser);

        const fetchData = async () => {
            try {
                const lessons = await getLessons();
                const progress = await getProgress();

                // Ідентифікатори завершених уроків
                const completedLessonIds = new Set(progress.map(p => p.lesson_id));

                // Оновлюємо уроки з інформацією про завершення та блокування
                const updatedLessons = lessons.map((lesson, index) => {
                    const isCompleted = completedLessonIds.has(lesson.id);

                    let isBlocked = true;
                    if (isCompleted) {
                        isBlocked = false;
                    } else {
                        const previousLesson = lessons[index - 1];
                        if (!previousLesson || completedLessonIds.has(previousLesson.id)) {
                            isBlocked = false;
                        }
                    }

                    return {
                        ...lesson,
                        isCompleted,
                        isBlocked,
                    };
                });

                // Сортуємо уроки відповідно до власного порядку літер
                const sortedLessons = customLetterOrder
                    .map(letter => updatedLessons.find(l => l.letter_upper === letter))
                    .filter(Boolean);

                setLetters(sortedLessons);
            } catch (err) {
                console.error("Помилка при завантаженні уроків або прогресу:", err);
                setError("Не вдалося завантажити дані. Спробуйте пізніше.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    /**
     * Обробник кліку по літері.
     * Якщо літера не заблокована, переходить до відповідного уроку.
     *
     * @param {object} letter Об'єкт літери
     */
    const handleLetterClick = (letter) => {
        if (letter.isBlocked) return;
        navigate(`/lesson/${letter.id}`);
    };

    /**
     * Повертає випадковий колір з набору кольорів для стилізації літер.
     *
     * @returns {string} HEX-код кольору
     */
    const getRandomColor = () => {
        const colors = [
            "#FFD54F", "#AED581", "#81C784", "#4FC3F7",
            "#7986CB", "#FF8A65", "#BA68C8", "#4DD0E1",
            "#FF7043", "#4CAF50", "#F06292", "#4E342E",
            "#64B5F6", "#DCE775", "#BA68C8", "#FFB300",
            "#009688", "#E57373",
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    /**
     * Обробник виходу з системи.
     * Викликає сервіс logout і перенаправляє на сторінку логіну.
     */
    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div style={userDashboardStyles.pageContainer}>
            <div style={userDashboardStyles.contentCard}>
                <button
                    onClick={handleLogout}
                    style={userDashboardStyles.logOutButton}
                >
                    Вийти
                </button>
                <h1 style={userDashboardStyles.pageTitle}>🌳 Лісова абетка 🦊</h1>

                {user && (
                    <p style={userDashboardStyles.userGreeting}>
                        Привіт, {user.username || "юний друже"}! 👋
                    </p>
                )}

                {loading ? (
                    <div style={{ textAlign: "center", padding: "20px" }}>
                        <p>Завантаження літер...</p>
                        <div style={userDashboardStyles.loadingIndicator}></div>
                    </div>
                ) : error ? (
                    <p style={{ color: "red", textAlign: "center" }}>{error}</p>
                ) : (
                    <>
                        <p style={userDashboardStyles.selectionPrompt}>
                            Обери літеру для вивчення:
                        </p>

                        <div style={userDashboardStyles.lettersGrid}>
                            {letters.length > 0 ? (
                                letters.map((letter) => {
                                    const bgColor = getRandomColor();
                                    const isBlocked = letter.isBlocked;

                                    return (
                                        <div
                                            key={letter.id}
                                            style={{
                                                ...userDashboardStyles.letterCard,
                                                backgroundColor: isBlocked
                                                    ? "#ccc" // Сірий фон для заблокованих
                                                    : bgColor,
                                                cursor: isBlocked ? "not-allowed" : "pointer",
                                                opacity: isBlocked ? 0.5 : 1,
                                            }}
                                            onClick={() => handleLetterClick(letter)}
                                            onMouseEnter={(e) => {
                                                if (!isBlocked) {
                                                    e.currentTarget.style.transform = "translateY(-5px) scale(1.05)";
                                                    e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.3)";
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = "translateY(0) scale(1)";
                                                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
                                            }}
                                        >
                                            {letter.letter_upper}
                                            <div style={userDashboardStyles.letterLowercase}>
                                                {letter.letter_lower}
                                            </div>
                                            {isBlocked && (
                                                <div style={userDashboardStyles.lockOverlay}>
                                                    🔒
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            ) : (
                                <div style={userDashboardStyles.emptyStateContainer}>
                                    <p style={userDashboardStyles.emptyStateMessage}>
                                        Літери ще не додані. Повертайтеся пізніше!
                                    </p>
                                    <p style={userDashboardStyles.emptyStateHint}>
                                        Адміністратор може додати уроки в панелі адміністратора.
                                    </p>
                                </div>
                            )}
                        </div>
                    </>
                )}

                <div style={userDashboardStyles.footerSection}>
                    <p style={userDashboardStyles.footerText}>
                        Вивчайте і грайтеся разом з нами! 🌲🦊🌞
                    </p>
                </div>
            </div>
        </div>
    );
}
