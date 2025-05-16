// Стилі для сторінки уроку
export const lessonPageStyles = {
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
        color: "#2E7D32",
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
        flexGrow: 1,
        padding: "20px",
        gap: "20px",
        height: "calc(100% - 130px)",
        overflow: "hidden"
    },

    // Ліва колонка
    leftColumn: {
        width: "60%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        height: "100%",
        overflow: "auto"
    },

    // Блок з буквами
    letterBlock: {
        backgroundColor: "rgba(232, 245, 233, 0.85)",
        borderRadius: "15px",
        padding: "15px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "2px solid #AED581"
    },

    blockTitle: {
        color: "#2E7D32",
        marginBottom: "10px",
        fontSize: "18px"
    },

    letterImage: {
        maxWidth: "100%",
        maxHeight: "220px",
        objectFit: "contain"
    },

    // Блок з аудіо
    audioBlock: {
        backgroundColor: "rgba(243, 229, 245, 0.85)",
        borderRadius: "15px",
        padding: "15px",
        border: "2px solid #CE93D8",
        flexGrow: 0
    },

    audioBlockTitle: {
        color: "#6A1B9A",
        marginBottom: "10px",
        fontSize: "18px",
        textAlign: "center"
    },

    audioButtonWrapper: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "10px"
    },

    // Інформаційні блоки
    infoBlock: {
        backgroundColor: "rgba(241, 248, 233, 0.85)",
        borderRadius: "15px",
        padding: "15px",
        border: "2px solid #AED581",
        flexGrow: 1
    },

    infoBlockTitle: {
        color: "#33691E",
        marginBottom: "10px",
        fontSize: "18px",
        textAlign: "center"
    },

    infoBlockText: {
        color: "#33691E",
        fontSize: "15px",
        lineHeight: "1.4"
    },

    // Права колонка
    rightColumn: {
        width: "40%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(227, 242, 253, 0.85)",
        borderRadius: "15px",
        border: "2px solid #64B5F6",
        overflow: "hidden"
    },

    objectsTitle: {
        color: "#1565C0",
        fontSize: "20px",
        margin: "15px 0",
        textAlign: "center",
        padding: "0 15px"
    },

    objectImageContainer: {
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "15px",
        overflow: "hidden"
    },

    objectImageWrapper: {
        width: "90%",
        height: "90%",
        backgroundColor: "white",
        borderRadius: "12px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "15px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    },

    objectImage: {
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain"
    },

    // Стилі для літер (закоментовані в оригінальному коді)
    lettersContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "15px",
        marginBottom: "15px"
    },

    upperLetter: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFEB3B",
        borderRadius: "12px",
        width: "70px",
        height: "70px",
        border: "3px solid #FFC107",
        fontSize: "42px"
    },

    lowerLetter: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E1F5FE",
        borderRadius: "12px",
        width: "70px",
        height: "70px",
        border: "3px solid #81D4FA",
        fontSize: "42px"
    },
};