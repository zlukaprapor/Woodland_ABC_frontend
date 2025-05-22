import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLessonById } from "../../api/lessons.jsx";
import Button from "../ui/Button.jsx";
import { quizPageStyles } from "../../styles/quizStyles.js";

/**
 * Компонент QuizPage відповідає за відображення квізу (тесту),
 * пов’язаного з певним уроком. Завантажує урок, витягує JSON з питаннями
 * та відображає інтерфейс проходження тесту з фідбеком і результатами.
 */
export default function QuizPage() {
    const { lessonId } = useParams(); // Отримуємо ID уроку з URL
    const [lesson, setLesson] = useState(null); // Дані уроку
    const [quizData, setQuizData] = useState(null); // Питання квізу
    const [loading, setLoading] = useState(true); // Стан завантаження
    const [error, setError] = useState(null); // Повідомлення про помилки
    const navigate = useNavigate(); // Навігація між сторінками

    // Стан квізу
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Індекс поточного питання
    const [selectedAnswer, setSelectedAnswer] = useState(null); // Вибрана відповідь
    const [showFeedback, setShowFeedback] = useState(false); // Відображення фідбеку
    const [score, setScore] = useState(0); // Кількість правильних відповідей
    const [completed, setCompleted] = useState(false); // Стан завершення квізу

    const API_BASE_URL = "http://127.0.0.1:8000/uploads"; // Базовий шлях до медіа

    /**
     * Форматує шлях до медіа-файлу (заміна зворотних слешів на прямі).
     * @param {string} path - відносний шлях до файлу
     * @returns {string|null}
     */
    const normalizePath = (path) =>
        path ? `${API_BASE_URL}/${path.replace(/\\/g, "/")}` : null;

    /**
     * Завантаження даних уроку та JSON-файлу з питаннями квізу при монтуванні компонента.
     */
    useEffect(() => {
        const fetchLessonAndQuiz = async () => {
            try {
                const lessonData = await getLessonById(lessonId);
                setLesson(lessonData);

                if (lessonData.quiz_file) {
                    try {
                        const quizResponse = await fetch(normalizePath(lessonData.quiz_file));
                        if (!quizResponse.ok) throw new Error("Не вдалося завантажити файл квізу");
                        const quizJson = await quizResponse.json();

                        // Підтримка як старого, так і нового формату JSON
                        setQuizData(quizJson.quiz || quizJson);
                    } catch (quizErr) {
                        console.error("Помилка при завантаженні квізу:", quizErr);
                        setError("Не вдалося завантажити завдання квізу. Спробуйте пізніше.");
                    }
                } else {
                    setError("Для цього уроку квіз не доступний.");
                }

                setLoading(false);
            } catch (err) {
                console.error("Помилка при завантаженні уроку:", err);
                setError("Не вдалося завантажити урок. Спробуйте пізніше.");
                setLoading(false);
            }
        };

        fetchLessonAndQuiz();
    }, [lessonId]);

    /**
     * Збереження прогресу у бекенді, якщо тест завершено і успішно пройдено (60%+).
     */
    useEffect(() => {
        if (!completed || !lessonId || !quizData) return;

        const percentage = Math.round((score / quizData.questions.length) * 100);
        if (percentage < 60) return; // Якщо недостатньо балів, прогрес не зберігається

        const saveProgress = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://127.0.0.1:8000/api/v1/progress/", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        lesson_id: parseInt(lessonId),
                        completed: true
                    })
                });

                if (!response.ok) throw new Error("Не вдалося оновити прогрес");
                console.log("✅ Прогрес успішно збережено");
            } catch (err) {
                console.error("❌ Помилка при збереженні прогресу:", err);
            }
        };

        saveProgress();
    }, [completed, lessonId, quizData, score]);

    /**
     * Обробник вибору відповіді користувачем.
     * @param {number} answerIndex - ID обраної відповіді
     */
    const handleAnswerSelect = (answerIndex) => {
        if (showFeedback) return;
        setSelectedAnswer(answerIndex);
    };

    /**
     * Перевіряє відповідь користувача та оновлює стан квізу.
     */
    const checkAnswer = () => {
        if (selectedAnswer === null) return;
        const currentQuestion = quizData.questions[currentQuestionIndex];
        const isCorrect = selectedAnswer === currentQuestion.correctAnswerId;

        if (isCorrect) setScore(prevScore => prevScore + 1);
        setShowFeedback(true);

        // Автоматичний перехід через 2 сек
        setTimeout(() => {
            if (currentQuestionIndex < quizData.questions.length - 1) {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
                setSelectedAnswer(null);
                setShowFeedback(false);
            } else {
                setCompleted(true);
            }
        }, 2000);
    };

    /** Скидає стан квізу для повторного проходження. */
    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setScore(0);
        setCompleted(false);
    };

    /**
     * Рендер поточного питання, включаючи зображення, варіанти відповідей, фідбек.
     */
    const renderCurrentQuestion = () => {
        if (!quizData || !quizData.questions || quizData.questions.length === 0) {
            return <p style={quizPageStyles.errorMessage}>Питання не знайдені</p>;
        }

        const currentQuestion = quizData.questions[currentQuestionIndex];
        const correctAnswerId = currentQuestion.correctAnswerId;

        return (
            <div style={quizPageStyles.questionContainer}>
                <h3 style={quizPageStyles.questionText}>{currentQuestion.question}</h3>

                {currentQuestion.image && (
                    <div style={quizPageStyles.questionImageWrapper}>
                        <img
                            src={normalizePath(currentQuestion.image)}
                            alt="Зображення до питання"
                            style={quizPageStyles.questionImage}
                        />
                    </div>
                )}

                <div style={quizPageStyles.answerOptions}>
                    {currentQuestion.options.map((option) => (
                        <div
                            key={option.id}
                            style={{
                                ...quizPageStyles.answerOption,
                                ...(selectedAnswer === option.id ? quizPageStyles.selectedAnswer : {}),
                                ...(showFeedback && option.id === correctAnswerId ? quizPageStyles.correctAnswer : {}),
                                ...(showFeedback && selectedAnswer === option.id && option.id !== correctAnswerId
                                    ? quizPageStyles.wrongAnswer
                                    : {})
                            }}
                            onClick={() => handleAnswerSelect(option.id)}
                        >
                            {option.text}
                        </div>
                    ))}
                </div>

                {showFeedback && (
                    <div style={quizPageStyles.feedback}>
                        {selectedAnswer === correctAnswerId ? (
                            <p style={quizPageStyles.correctFeedback}>Правильно! 👍</p>
                        ) : (
                            <p style={quizPageStyles.wrongFeedback}>
                                Неправильно. Правильна відповідь: {
                                currentQuestion.options.find(opt => opt.id === correctAnswerId)?.text
                            }
                            </p>
                        )}
                    </div>
                )}

                {!showFeedback && (
                    <div style={quizPageStyles.buttonContainer}>
                        <Button
                            onClick={checkAnswer}
                            text="Перевірити"
                            color="#4CAF50"
                            disabled={selectedAnswer === null}
                            style={selectedAnswer === null ? quizPageStyles.disabledButton : {}}
                        />
                    </div>
                )}

                <div style={quizPageStyles.progressBar}>
                    <div style={quizPageStyles.progressText}>
                        Питання {currentQuestionIndex + 1} з {quizData.questions.length}
                    </div>
                    <div style={quizPageStyles.progressBarContainer}>
                        <div
                            style={{
                                ...quizPageStyles.progressBarFill,
                                width: `${((currentQuestionIndex + 1) / quizData.questions.length) * 100}%`
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        );
    };

    /**
     * Рендер результатів після завершення тесту.
     */
    const renderResults = () => {
        const percentage = Math.round((score / quizData.questions.length) * 100);
        let resultMessage = "";
        let resultColor = "";

        if (percentage >= 80) {
            resultMessage = "Відмінно! Ти чудово впорався!";
            resultColor = "#4CAF50";
        } else if (percentage >= 60) {
            resultMessage = "Добре! Ти молодець!";
            resultColor = "#8BC34A";
        } else {
            resultMessage = "Спробуй ще раз, щоб покращити результат!";
            resultColor = "#FFC107";
        }

        return (
            <div style={quizPageStyles.resultsContainer}>
                <h2 style={{ ...quizPageStyles.resultsTitle, color: resultColor }}>
                    Результати тесту
                </h2>

                <div style={quizPageStyles.resultsScoreContainer}>
                    <div style={quizPageStyles.resultsScore}>
                        {score} з {quizData.questions.length} правильних відповідей
                    </div>
                    <div style={quizPageStyles.resultsPercentage}>
                        {percentage}%
                    </div>
                </div>

                <p style={{ ...quizPageStyles.resultsFeedback, color: resultColor }}>
                    {resultMessage}
                </p>

                {lesson && lesson.letter_image && (
                    <div style={quizPageStyles.resultLetterContainer}>
                        <img
                            src={normalizePath(lesson.letter_image)}
                            alt={`Літера ${lesson?.letter_upper || ""}`}
                            style={quizPageStyles.resultLetterImage}
                        />
                    </div>
                )}

                <div style={quizPageStyles.resultsButtons}>
                    <Button onClick={restartQuiz} text="Спробувати ще раз" color="#FFA726" />
                    <Button onClick={() => navigate(`/lesson/${lessonId}`)} text="Повернутися до уроку" color="#66BB6A" />
                    <Button onClick={() => navigate("/dashboard")} text="До абетки" color="#42A5F5" />
                </div>
            </div>
        );
    };

    /**
     * Основний рендер компонента: показує завантаження, помилку або сам квіз.
     */
    return (
        <div style={quizPageStyles.mainContainer}>
            <div style={quizPageStyles.contentWrapper}>
                {loading ? (
                    <div style={quizPageStyles.loadingContainer}>
                        <div style={quizPageStyles.loadingContent}>
                            <p style={quizPageStyles.loadingText}>Завантаження тесту...</p>
                            <div style={quizPageStyles.loadingIndicator}></div>
                        </div>
                    </div>
                ) : error ? (
                    <div style={quizPageStyles.errorContainer}>
                        <div style={quizPageStyles.errorContent}>
                            <p style={quizPageStyles.errorMessage}>{error}</p>
                            <div style={quizPageStyles.errorActions}>
                                <Button
                                    onClick={() => navigate(`/lesson/${lessonId}`)}
                                    text="⬅️ Повернутися до уроку"
                                    color="#66BB6A"
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Заголовок */}
                        <div style={quizPageStyles.header}>
                            <h1 style={quizPageStyles.headerTitle}>
                                Тестування: літера {lesson?.letter_upper || "..."}
                            </h1>
                            <div style={quizPageStyles.headerButtons}>
                                <Button
                                    onClick={() => navigate(`/lesson/${lessonId}`)}
                                    text="⬅️ До уроку"
                                    color="#66BB6A"
                                    style={quizPageStyles.headerButtonStyle}
                                />
                                <Button
                                    onClick={() => navigate("/dashboard")}
                                    text="До абетки ➡️"
                                    color="#42A5F5"
                                    style={quizPageStyles.headerButtonStyle}
                                />
                            </div>
                        </div>

                        {/* Основний контент */}
                        <div style={quizPageStyles.mainContent}>
                            {completed ? renderResults() : renderCurrentQuestion()}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
