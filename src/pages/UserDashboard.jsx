import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLessons } from "../api/lessons";
import { getAuthUser } from "../services/authService";
import { pageStyles } from "../styles/commonStyles";

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
        <div style={{
            ...pageStyles.container,
            backgroundColor: "#E8F5E9",
            minHeight: "100vh",
            padding: "20px"
        }}>
            <div style={{
                ...pageStyles.card,
                width: "90%",
                maxWidth: "800px",
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
                padding: "30px",
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
            }}>
                <h1 style={{
                    ...pageStyles.title,
                    color: "#2E7D32",
                    marginBottom: "10px"
                }}>🌳 Лісова абетка 🦊</h1>

                {user && (
                    <p style={{
                        fontSize: "18px",
                        color: "#5D4037",
                        marginBottom: "20px"
                    }}>
                        Привіт, {user.username || "юний друже"}! 👋
                    </p>
                )}

                {loading ? (
                    <div style={{ textAlign: "center", padding: "20px" }}>
                        <p>Завантаження літер...</p>
                        <div style={{
                            borderTop: "5px dotted #AED581",
                            margin: "10px auto",
                            width: "50px"
                        }}></div>
                    </div>
                ) : error ? (
                    <p style={{ color: "red", textAlign: "center" }}>{error}</p>
                ) : (
                    <>
                        <p style={{
                            ...pageStyles.subtitle,
                            color: "#5D4037",
                            marginBottom: "20px",
                            fontSize: "18px"
                        }}>
                            Обери літеру для вивчення:
                        </p>

                        <div style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            gap: "15px"
                        }}>
                            {letters && letters.length > 0 ? (
                                letters.map((letter) => {
                                    const bgColor = getRandomColor();

                                    return (
                                        <div
                                            key={letter.id}
                                            style={{
                                                width: "80px",
                                                height: "80px",
                                                borderRadius: "12px",
                                                backgroundColor: bgColor,
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                fontSize: "36px",
                                                fontWeight: "bold",
                                                cursor: "pointer",
                                                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                                                transition: "transform 0.3s, box-shadow 0.3s",
                                                border: "3px solid #FFC107",
                                                color: "#5D4037",
                                                position: "relative",
                                                overflow: "hidden"
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
                                            <div style={{
                                                position: "absolute",
                                                bottom: "3px",
                                                right: "3px",
                                                fontSize: "14px",
                                                opacity: 0.7
                                            }}>
                                                {letter.letter_lower}
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div style={{ textAlign: "center", padding: "20px" }}>
                                    <p style={{ color: "#5D4037" }}>
                                        Літери ще не додані. Повертайтеся пізніше!
                                    </p>
                                    <p style={{ color: "#5D4037", fontSize: "14px", marginTop: "10px" }}>
                                        Адміністратор може додати уроки в панелі адміністратора.
                                    </p>
                                </div>
                            )}
                        </div>
                    </>
                )}

                <div style={{
                    marginTop: "30px",
                    textAlign: "center",
                    borderTop: "2px dashed #AED581",
                    paddingTop: "20px"
                }}>
                    <p style={{
                        color: "#5D4037",
                        fontSize: "14px"
                    }}>
                        Вивчайте і грайтеся разом з нами! 🌲🦊🌞
                    </p>
                </div>
            </div>
        </div>
    );
}