// Стилі для компонентів управління уроками
export const adminStyles = {
    // Стилі для CreateLessonPage і EditLessonPage
    container: {
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
    },
    backButton: {
        padding: "8px 16px",
        backgroundColor: "#f0f0f0",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "14px",
    },
    formContainer: {
        backgroundColor: "#fff",
        borderRadius: "8px",
        padding: "20px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    },

    // Стилі для LessonCard
    card: {
        display: "flex",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        padding: "20px",
        marginBottom: "20px",
        position: "relative",
    },
    letterSection: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "80px",
        borderRight: "1px solid #eee",
        paddingRight: "20px",
        marginRight: "20px",
    },
    letter: {
        fontSize: "48px",
        fontWeight: "bold",
        color: "#ff7043",
    },
    letterSmall: {
        fontSize: "28px",
        color: "#ff7043",
    },
    content: {
        flex: 1,
    },
    title: {
        marginTop: 0,
        marginBottom: "10px",
        color: "#333",
    },
    description: {
        fontSize: "16px",
        color: "#666",
        margin: "0 0 10px 0",
    },
    training: {
        fontSize: "14px",
        color: "#555",
        margin: "0 0 10px 0",
    },
    regulations: {
        fontSize: "14px",
        color: "#555",
        margin: "0 0 10px 0",
    },
    mediaInfo: {
        fontSize: "14px",
        color: "#777",
        marginTop: "15px",
    },
    mediaItem: {
        marginBottom: "10px",
    },
    mediaPreview: {
        marginTop: "5px",
        display: "inline-block",
        verticalAlign: "middle",
    },
    thumbnail: {
        width: "60px",
        height: "60px",
        objectFit: "cover",
        borderRadius: "4px",
        marginLeft: "10px",
        border: "1px solid #ddd",
    },
    audio: {
        height: "30px",
        marginLeft: "10px",
        verticalAlign: "middle",
    },
    actions: {
        display: "flex",
        alignItems: "center",
    },

    // Стилі для LessonsListPage
    buttonContainer: {
        display: "flex",
        gap: "10px",
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

    // Стилі для LessonForm
    form: {
        maxWidth: "500px",
        width: "100%",
        margin: "2rem auto",
        padding: "1rem",
        background: "#fff7e6",
        borderRadius: "1rem",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        boxSizing: "border-box",
    },
    formRow: {
        display: "flex",
        gap: "10px",
    },
    formColumn: {
        flex: 1,
    },
    textareaField: {
        minHeight: "100px",
        width: "100%",
        padding: "0.5rem",
        margin: "0.5rem 0",
        borderRadius: "0.5rem",
        border: "1px solid #ccc",
        boxSizing: "border-box",
        display: "block",
    },
    formGroup: {
        marginBottom: "15px",
    },
    fileInput: {
        marginBottom: "10px",
    },
    submitButton: {
        marginTop: "20px",
        width: "100%",
    },
};