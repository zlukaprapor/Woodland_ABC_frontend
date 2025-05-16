import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {getLessons} from "../api/lessons";
import {getAuthUser} from "../services/authService";
import {userDashboardStyles} from "../styles/pagesStyles.js";

export default function UserDashboard() {
    const [letters, setLetters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Отримуємо інформацію про поточного користувача
        const currentUser = getAuthUser();
        setUser(currentUser);

        const fetchLetters = async () => {
            try {
                // Запит на отримання списку уроків
                const response = await getLessons();
                console.log("API відповідь:", response); // Для дебагу

                // Перевіряємо структуру відповіді і встановлюємо дані правильно
                if (response && Array.isArray(response)) {
                    setLetters(response);
                } else if (response && Array.isArray(response.lessons)) {
                    setLetters(response.lessons);
                } else if (response && Array.isArray(response.items)) {
                    setLetters(response.items);
                } else {
                    console.error("Неочікувана структура відповіді API:", response);
                    setLetters([]);
                }
                setLoading(false);
            } catch (err) {
                console.error("Помилка при завантаженні літер:", err);
                setError("Не вдалося завантажити літери. Спробуйте пізніше.");
                setLoading(false);
            }
        };

        fetchLetters();
    }, []);

    const handleLetterClick = (letter) => {
        navigate(`/lesson/${letter.id}`);
    };

    const getRandomColor = () => {
        const colors = [
            "#FFD54F", // жовтий
            "#AED581", // зелений
            "#81C784", // темно-зелений
            "#4FC3F7", // голубий
            "#7986CB", // фіолетовий
            "#FF8A65", // оранжевий
            "#BA68C8", // рожевий
            "#4DD0E1", // бірюзовий
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    // Для відлагодження стану
    console.log("Поточний стан letters:", letters);
    console.log("Кількість уроків:", letters?.length);

    return (
        <div style={userDashboardStyles.pageContainer}>
            <div style={userDashboardStyles.contentCard}>
                <h1 style={userDashboardStyles.pageTitle}>
                    🌳 Лісова абетка 🦊
                </h1>

                {user && (
                    <p style={userDashboardStyles.userGreeting}>
                        Привіт, {user.username || "юний друже"}! 👋
                    </p>
                )}

                {loading ? (
                    <div style={{textAlign: "center", padding: "20px"}}>
                        <p>Завантаження літер...</p>
                        <div style={userDashboardStyles.loadingIndicator}></div>
                    </div>
                ) : error ? (
                    <p style={{color: "red", textAlign: "center"}}>{error}</p>
                ) : (
                    <>
                        <p style={userDashboardStyles.selectionPrompt}>
                            Обери літеру для вивчення:
                        </p>

                        <div style={userDashboardStyles.lettersGrid}>
                            {letters && letters.length > 0 ? (
                                letters.map((letter) => {
                                    const bgColor = getRandomColor();

                                    return (
                                        <div
                                            key={letter.id}
                                            style={{
                                                ...userDashboardStyles.letterCard,
                                                backgroundColor: bgColor,
                                            }}
                                            onClick={() => handleLetterClick(letter)}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = "translateY(-5px) scale(1.05)";
                                                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.3)";
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