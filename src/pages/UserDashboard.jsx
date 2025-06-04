import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getLessons } from "../api/lessons";
import { getProgress } from "../api/progress";
import { getAuthUser } from "../services/authService";
import { logout } from "../services/authService";
import { userDashboardStyles } from "../styles/pagesStyles.js";

/**
 * Компонент панелі користувача для відображення уроків з літер,
 * прогресу користувача та можливості переходу до уроків.
 */
export default function UserDashboard() {
    const [letters, setLetters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const scrollRef = useRef(null);

    const customLetterOrder = [
        'А', 'У', 'О', 'М', 'Н', 'И', 'І', 'С', 'Л', 'К', 'В',
        'Е', 'Р', 'П', 'Т', 'Ш', 'Д', 'З', 'Б', 'Г', 'Ґ', 'Ч',
        'Х','Ц', 'Й', 'Ь', 'Ж', 'Ї', 'Я', 'Є', 'Ю', 'Щ', 'Ф'
    ];

    useEffect(() => {
        const currentUser = getAuthUser();
        setUser(currentUser);

        const fetchData = async () => {
            try {
                const lessons = await getLessons();
                const progress = await getProgress();

                const completedLessonIds = new Set(progress.map(p => p.lesson_id));

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

    const handleLetterClick = (letter) => {
        if (letter.isBlocked) return;
        navigate(`/lesson/${letter.id}`);
    };

    // Фіксуємо кольори, щоб не змінювались при кожному рендері
    const letterColors = useMemo(() => {
        const colors = [
            "#FFD54F", "#AED581", "#81C784", "#4FC3F7",
            "#7986CB", "#FF8A65", "#BA68C8", "#4DD0E1",
            "#FF7043", "#4CAF50", "#F06292", "#4E342E",
            "#64B5F6", "#DCE775", "#BA68C8", "#FFB300",
            "#009688", "#E57373",
        ];
        return letters.map(() => colors[Math.floor(Math.random() * colors.length)]);
    }, [letters]);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
        }
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

                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <button
                                onClick={scrollLeft}
                                style={{
                                    fontSize: 24,
                                    cursor: "pointer",
                                    background: "none",
                                    border: "none",
                                    userSelect: "none",
                                }}
                                aria-label="Прокрутити вліво"
                            >
                                ◀
                            </button>

                            <div
                                ref={scrollRef}
                                style={{
                                    ...userDashboardStyles.lettersGrid,
                                    overflowX: "auto",
                                    display: "flex",
                                    gap: 12,
                                    paddingBottom: 10,
                                    scrollBehavior: "smooth",
                                    // Приховуємо скроллбар у WebKit (Safari, Chrome)
                                    WebkitOverflowScrolling: "touch",
                                }}
                            >
                                {letters.length > 0 ? (
                                    letters.map((letter, i) => {
                                        const bgColor = letter.isBlocked ? "#ccc" : letterColors[i];
                                        const isBlocked = letter.isBlocked;

                                        return (
                                            <div
                                                key={letter.id}
                                                style={{
                                                    ...userDashboardStyles.letterCard,
                                                    backgroundColor: bgColor,
                                                    cursor: isBlocked ? "not-allowed" : "pointer",
                                                    opacity: isBlocked ? 0.5 : 1,
                                                    flex: "0 0 auto",
                                                    transition: "transform 0.3s, box-shadow 0.3s",
                                                    borderRadius: 12,
                                                    userSelect: "none",
                                                    padding: "20px 24px",
                                                    fontSize: 36,
                                                    fontWeight: "bold",
                                                    color: "#333",
                                                    textAlign: "center",
                                                    position: "relative",
                                                }}
                                                onClick={() => handleLetterClick(letter)}
                                                onMouseEnter={(e) => {
                                                    if (!isBlocked) {
                                                        e.currentTarget.style.transform = "translateY(-8px) scale(1.1)";
                                                        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.25)";
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                                                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
                                                }}
                                            >
                                                {letter.letter_upper}
                                                <div style={{ fontSize: 18, marginTop: 4, opacity: 0.8 }}>
                                                    {letter.letter_lower}
                                                </div>
                                                {isBlocked && (
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            top: 8,
                                                            right: 8,
                                                            fontSize: 18,
                                                        }}
                                                    >
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

                            <button
                                onClick={scrollRight}
                                style={{
                                    fontSize: 24,
                                    cursor: "pointer",
                                    background: "none",
                                    border: "none",
                                    userSelect: "none",
                                }}
                                aria-label="Прокрутити вправо"
                            >
                                ▶
                            </button>
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
