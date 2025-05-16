// Стилі для сторінки квізу
export const quizPageStyles = {
    // Головний контейнер
    mainContainer: {
        backgroundImage: "url('/gpt/ChatGPT Image 6 квіт. 2025 р., 12_11_35.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100vh",
        margin: 0,
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
    },
    // Основний блок контенту
    contentWrapper: {
        width: "100%",
        borderRadius: "16px",
        maxWidth: "1336px",
        height: "100%",
        maxHeight: "768px",
        backgroundColor: "rgba(255, 255, 255, 0.75)",
        display: "flex",
        flexDirection: "column",
        position: "relative"
    },
    // Стилі для завантаження
    loadingContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    },
    loadingContent: {
        textAlign: "center"
    },
    loadingText: {
        fontSize: "18px"
    },
    loadingIndicator: {
        borderTop: "5px dotted #AED581",
        margin: "10px auto",
        width: "50px"
    },
    // Стилі для помилок
    errorContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    },
    errorContent: {
        textAlign: "center"
    },
    errorMessage: {
        color: "red",
        fontSize: "18px"
    },
    errorActions: {
        marginTop: "20px"
    },
    // Хедер сторінки
    header: {
        padding: "12px 24px",
        borderRadius: "16px",
        marginBottom: "1.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Comic Sans MS', cursive"
    },
    headerTitle: {
        color: "#E65100",
        fontSize: "clamp(20px, 4vw, 28px)",
        margin: 0
    },
    headerButtons: {
        display: "flex",
        gap: "10px"
    },
    headerButtonStyle: {
        fontSize: "14px",
        padding: "6px 14px"
    },
    // Основний контент
    mainContent: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        padding: "20px",
        height: "calc(100% - 130px)",
        overflow: "auto"
    },
    // Контейнер питання
    questionContainer: {
        backgroundColor: "rgba(255, 243, 224, 0.85)",
        borderRadius: "15px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "2px solid #FFB74D",
        height: "100%",
        overflow: "auto"
    },
    questionText: {
        color: "#E65100",
        marginBottom: "20px",
        fontSize: "22px",
        textAlign: "center"
    },
    questionImageWrapper: {
        maxWidth: "50%",
        maxHeight: "200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "10px",
        margin: "0 auto 20px auto",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
    },
    questionImage: {
        maxWidth: "100%",
        maxHeight: "180px",
        objectFit: "contain"
    },
    // Варіанти відповідей
    answerOptions: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        width: "100%",
        marginBottom: "20px"
    },
    answerOption: {
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        borderRadius: "10px",
        padding: "15px",
        fontSize: "16px",
        cursor: "pointer",
        border: "2px solid #FFB74D",
        transition: "all 0.3s ease",
        color: "#333"
    },
    selectedAnswer: {
        border: "2px solid #FF9800",
        backgroundColor: "rgba(255, 152, 0, 0.15)",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
    },
    correctAnswer: {
        border: "2px solid #4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.15)",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
    },
    wrongAnswer: {
        border: "2px solid #F44336",
        backgroundColor: "rgba(244, 67, 54, 0.15)",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
    },
    // Стилі для фідбеку
    feedback: {
        marginTop: "15px",
        textAlign: "center",
        fontSize: "18px",
        fontWeight: "bold",
        padding: "10px",
        borderRadius: "10px"
    },
    correctFeedback: {
        color: "#2E7D32",
        backgroundColor: "rgba(129, 199, 132, 0.3)",
        padding: "10px",
        borderRadius: "10px"
    },
    wrongFeedback: {
        color: "#C62828",
        backgroundColor: "rgba(239, 154, 154, 0.3)",
        padding: "10px",
        borderRadius: "10px"
    },
    // Кнопки
    buttonContainer: {
        display: "flex",
        justifyContent: "center",
        marginTop: "20px"
    },
    disabledButton: {
        opacity: 0.5,
        cursor: "not-allowed"
    },
    // Прогрес бар
    progressBar: {
        marginTop: "20px",
        width: "100%"
    },
    progressText: {
        textAlign: "center",
        marginBottom: "5px",
        color: "#E65100"
    },
    progressBarContainer: {
        height: "8px",
        backgroundColor: "#E0E0E0",
        borderRadius: "4px",
        overflow: "hidden"
    },
    progressBarFill: {
        height: "100%",
        backgroundColor: "#FF9800",
        transition: "width 0.5s ease"
    },
    // Результати тесту
    resultsContainer: {
        backgroundColor: "rgba(255, 243, 224, 0.85)",
        borderRadius: "15px",
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "2px solid #FFB74D",
        height: "100%",
        overflow: "auto"
    },
    resultsTitle: {
        fontSize: "28px",
        marginBottom: "30px",
        textAlign: "center"
    },
    resultsScoreContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "20px"
    },
    resultsScore: {
        fontSize: "22px",
        marginBottom: "10px",
        color: "#212121"
    },
    resultsPercentage: {
        fontSize: "40px",
        fontWeight: "bold",
        color: "#E65100"
    },
    resultsFeedback: {
        fontSize: "24px",
        marginBottom: "30px",
        textAlign: "center"
    },
    resultLetterContainer: {
        maxWidth: "200px",
        maxHeight: "200px",
        margin: "0 auto 30px auto"
    },
    resultLetterImage: {
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain"
    },
    resultsButtons: {
        display: "flex",
        gap: "15px",
        flexWrap: "wrap",
        justifyContent: "center"
    }
};