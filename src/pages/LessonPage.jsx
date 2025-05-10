import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLessonById } from "../api/lessons";
import Button from "../components/Button";
import { pageStyles } from "../styles/commonStyles";

export default function LessonPage() {
    const { lessonId } = useParams();
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const API_BASE_URL = "http://127.0.0.1:8000/uploads";

    // Функція для правильного форматування шляху до медіа-файлів
    const normalizePath = (path) =>
        path ? `${API_BASE_URL}/${path.replace(/\\/g, "/")}` : null;

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

    // Функція для відтворення аудіо
    const playAudio = () => {
        if (lesson && lesson.audio_file) {
            const audioUrl = normalizePath(lesson.audio_file);
            console.log("Граю аудіо:", audioUrl);
            const audio = new Audio(audioUrl);
            audio.play().catch(e => console.error("Помилка відтворення аудіо:", e));
        }
    };

    return (
        <div style={{
            backgroundImage: "url('/gpt/ChatGPT Image 6 квіт. 2025 р., 12_11_35.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100vh", // Використовуємо повну висоту вікна
            margin: 0,
            padding: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden" // Прибираємо прокрутку на головному контейнері
        }}>
            <div style={{
                width: "100%",
                borderRadius: "16px",
                maxWidth: "1336px", // Оптимізація для 1336px ширини
                height: "100%",
                maxHeight: "768px", // Оптимізація для 768px висоти
                backgroundColor: "rgba(255, 255, 255, 0.75)", // Напівпрозорий фон
                display: "flex",
                flexDirection: "column",
                position: "relative"
            }}>
                {loading ? (
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%"
                    }}>
                        <div style={{ textAlign: "center" }}>
                            <p style={{ fontSize: "18px" }}>Завантаження уроку...</p>
                            <div style={{
                                borderTop: "5px dotted #AED581",
                                margin: "10px auto",
                                width: "50px"
                            }}></div>
                        </div>
                    </div>
                ) : error ? (
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%"
                    }}>
                        <div style={{ textAlign: "center" }}>
                            <p style={{ color: "red", fontSize: "18px" }}>{error}</p>
                            <div style={{ marginTop: "20px" }}>
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
                        {/* Хедер з заголовком */}
                        <div style={{
                            padding: "12px 24px",
                            // backgroundColor: "rgba(255, 255, 255, 0.8)",
                            borderRadius: "16px",
                            marginBottom: "1.5rem",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                            fontFamily: "'Comic Sans MS', cursive",
                        }}>
                            <h1 style={{
                                color: "#2E7D32",
                                fontSize: "clamp(20px, 4vw, 28px)",
                                margin: 0
                            }}>
                                Вивчаємо літеру {lesson?.letter_upper || "..."}
                            </h1>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <Button
                                    onClick={() => navigate("/dashboard")}
                                    text="⬅️ До абетки"
                                    color="#66BB6A"
                                    style={{ fontSize: "14px", padding: "6px 14px" }}
                                />
                                <Button
                                    onClick={() => navigate("/dashboard")}
                                    text="До тестування ➡️"
                                    color="#FFA726"
                                    style={{ fontSize: "14px", padding: "6px 14px" }}
                                />
                            </div>
                        </div>

                        {/* Основний контент */}
                        <div style={{
                            display: "flex",
                            flexGrow: 1,
                            padding: "20px",
                            gap: "20px",
                            height: "calc(100% - 130px)",
                            overflow: "hidden"
                        }}>
                            {/* Ліва колонка */}
                            <div style={{
                                width: "40%",
                                display: "flex",
                                flexDirection: "column",
                                gap: "20px",
                                height: "100%",
                                overflow: "auto" // Додаємо прокрутку на випадок переповнення
                            }}>
                                {/* Блок з буквами */}
                                <div style={{
                                    backgroundColor: "rgba(232, 245, 233, 0.85)",
                                    borderRadius: "15px",
                                    padding: "15px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    border: "2px solid #AED581"
                                }}>
                                    <h3 style={{
                                        color: "#2E7D32",
                                        marginBottom: "10px",
                                        fontSize: "18px"
                                    }}>
                                        Літера та її написання
                                    </h3>
                                    {/*<div style={{*/}
                                    {/*    display: "flex",*/}
                                    {/*    justifyContent: "center",*/}
                                    {/*    gap: "15px",*/}
                                    {/*    marginBottom: "15px"*/}
                                    {/*}}>*/}
                                    {/*    <span style={{*/}
                                    {/*        display: "flex",*/}
                                    {/*        justifyContent: "center",*/}
                                    {/*        alignItems: "center",*/}
                                    {/*        backgroundColor: "#FFEB3B",*/}
                                    {/*        borderRadius: "12px",*/}
                                    {/*        width: "70px",*/}
                                    {/*        height: "70px",*/}
                                    {/*        border: "3px solid #FFC107",*/}
                                    {/*        fontSize: "42px"*/}
                                    {/*    }}>*/}
                                    {/*        {lesson.letter_upper}*/}
                                    {/*    </span>*/}
                                    {/*    <span style={{*/}
                                    {/*        display: "flex",*/}
                                    {/*        justifyContent: "center",*/}
                                    {/*        alignItems: "center",*/}
                                    {/*        backgroundColor: "#E1F5FE",*/}
                                    {/*        borderRadius: "12px",*/}
                                    {/*        width: "70px",*/}
                                    {/*        height: "70px",*/}
                                    {/*        border: "3px solid #81D4FA",*/}
                                    {/*        fontSize: "42px"*/}
                                    {/*    }}>*/}
                                    {/*        {lesson.letter_lower}*/}
                                    {/*    </span>*/}
                                    {/*</div>*/}

                                    {lesson.letter_image && (
                                        // <div style={{
                                        //     width: "100%",
                                        //     padding: "10px",
                                        //     backgroundColor: "white",
                                        //     borderRadius: "10px",
                                        //     border: "2px solid #AED581",
                                        //     display: "flex",
                                        //     justifyContent: "center"
                                        // }}>
                                            <img
                                                src={normalizePath(lesson.letter_image)}
                                                alt={`Літера ${lesson.letter_upper}`}
                                                style={{
                                                    maxWidth: "100%",
                                                    maxHeight: "220px",
                                                    objectFit: "contain"
                                                }}
                                            />
                                        // </div>
                                    )}
                                </div>

                                {/* Блок з аудіо */}
                                {lesson.audio_file && (
                                    <div style={{
                                        backgroundColor: "rgba(243, 229, 245, 0.85)",
                                        borderRadius: "15px",
                                        padding: "15px",
                                        border: "2px solid #CE93D8",
                                        flexGrow: 0
                                    }}>
                                        <h3 style={{
                                            color: "#6A1B9A",
                                            marginBottom: "10px",
                                            fontSize: "18px",
                                            textAlign: "center"
                                        }}>
                                            Як звучить ця літера:
                                        </h3>
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            marginBottom: "10px"
                                        }}>
                                            <Button
                                                onClick={playAudio}
                                                text="▶️ Послухати"
                                                color="#9C27B0"
                                            />
                                        </div>
                                        {/*<audio*/}
                                        {/*    controls*/}
                                        {/*    src={normalizePath(lesson.audio_file)}*/}
                                        {/*    style={{*/}
                                        {/*        width: "100%"*/}
                                        {/*    }}*/}
                                        {/*>*/}
                                        {/*    Ваш браузер не підтримує елемент audio.*/}
                                        {/*</audio>*/}
                                    </div>
                                )}

                                {/* Додаткова інформація */}
                                {lesson.description && (
                                    <div style={{
                                        backgroundColor: "rgba(241, 248, 233, 0.85)",
                                        borderRadius: "15px",
                                        padding: "15px",
                                        border: "2px solid #AED581",
                                        flexGrow: 1
                                    }}>
                                        <h3 style={{
                                            color: "#33691E",
                                            marginBottom: "10px",
                                            fontSize: "18px",
                                            textAlign: "center"
                                        }}>
                                            Цікаво знати:
                                        </h3>
                                        <p style={{
                                            color: "#33691E",
                                            fontSize: "15px",
                                            lineHeight: "1.4"
                                        }}>
                                            {lesson.description}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Права колонка */}
                            <div style={{
                                width: "60%",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                backgroundColor: "rgba(227, 242, 253, 0.85)",
                                borderRadius: "15px",
                                border: "2px solid #64B5F6",
                                overflow: "hidden" // Прибираємо вихід за межі
                            }}>
                                <h3 style={{
                                    color: "#1565C0",
                                    fontSize: "20px",
                                    margin: "15px 0",
                                    textAlign: "center",
                                    padding: "0 15px"
                                }}>
                                    Предмет на літеру {lesson.letter_upper}:
                                </h3>

                                {lesson.object_image && (
                                    <div style={{
                                        flexGrow: 1,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        padding: "15px",
                                        overflow: "hidden"
                                    }}>
                                        <div style={{
                                            width: "90%",
                                            height: "90%",
                                            backgroundColor: "white",
                                            borderRadius: "12px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: "15px",
                                            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                                        }}>
                                            <img
                                                src={normalizePath(lesson.object_image)}
                                                alt={`Предмет на літеру ${lesson.letter_upper}`}
                                                style={{
                                                    maxWidth: "100%",
                                                    maxHeight: "100%",
                                                    objectFit: "contain"
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </>
                ) : (
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%"
                    }}>
                        <div style={{ textAlign: "center" }}>
                            <p style={{ fontSize: "18px" }}>Урок не знайдено</p>
                            <div style={{ marginTop: "20px" }}>
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