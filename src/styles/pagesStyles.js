// Стилі для головної сторінки
export const homePageStyles = {
    pageContainer: {
        backgroundImage: "url('/HomePage.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Comic Sans MS', cursive, sans-serif",
    },
    welcomeCard: {
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        padding: "40px",
        borderRadius: "24px",
        textAlign: "center",
        boxShadow: "0 0 20px rgba(0,0,0,0.2)",
    },
    welcomeTitle: {
        fontSize: "2.5rem",
        marginBottom: "10px",
        color: "#ff7043",
    },
    welcomeSubtitle: {
        fontSize: "1.2rem",
        color: "#555",
        marginBottom: "30px",
    },

};

// Стилі для панелі адміністратора
export const adminDashboardStyles = {
    pageContainer: {
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
    },
    navHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
    },
    pageTitle: {
        color: "#ff7043",
        margin: 0,
    },
    welcomeMessage: {
        fontSize: "18px",
        marginBottom: "30px",
    },
    menuGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "20px",
    },
    menuItem: {
        backgroundColor: "#fff",
        padding: "25px",
        borderRadius: "10px",
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
        },
    },
};

// Стилі для панелі користувача
export const userDashboardStyles = {
    pageContainer: {
        backgroundImage: "url('/HomePage.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#E8F5E9",
        minHeight: "100vh",
        fontFamily: "'Comic Sans MS', cursive, sans-serif",
    },
    contentCard: {
        width: "90%",
        maxWidth: "800px",
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        padding: "30px",
        borderRadius: "20px",
        textAlign: "center",
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
    },
    logOutButton: {
        backgroundColor: "#f44336",
        color: "white",
        border: "none",
        borderRadius: "4px",
        padding: "8px 16px",
        cursor: "pointer",
        fontWeight: "bold",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        position: "absolute",
        top: "20px",
        right: "20px",
    },
    pageTitle: {
        fontSize: "2.5rem",
        marginBottom: "10px",
        color: "#2E7D32",
    },
    selectionPrompt: {
        fontSize: "18px",
        color: "#5D4037",
        marginBottom: "20px",
    },
    userGreeting: {
        fontSize: "18px",
        color: "#5D4037",
        marginBottom: "20px"
    },
    loadingIndicator: {
        borderTop: "5px dotted #AED581",
        margin: "10px auto",
        width: "50px"
    },
    lettersGrid: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "15px"
    },
    letterCard: {
        width: "150px",
        height: "150px",
        borderRadius: "12px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "86px",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        transition: "transform 0.3s, box-shadow 0.3s",
        border: "3px solid #FFC107",
        color: "#5D4037",
        position: "relative",
        overflow: "hidden"
    },
    letterLowercase: {
        position: "absolute",
        bottom: "3px",
        right: "3px",
        fontSize: "34px",
        opacity: 0.7
    },
    emptyStateContainer: {
        textAlign: "center",
        padding: "20px"
    },
    emptyStateMessage: {
        color: "#5D4037"
    },
    emptyStateHint: {
        color: "#5D4037",
        fontSize: "14px",
        marginTop: "10px"
    },
    footerSection: {
        marginTop: "30px",
        textAlign: "center",
        borderTop: "2px dashed #AED581",
        paddingTop: "20px"
    },
    footerText: {
        color: "#5D4037",
        fontSize: "14px"
    },
    lockOverlay: {
        position: "absolute",
        top: "5px",
        right: "10px",
        fontSize: "20px",
        color: "#333",
        pointerEvents: "none",
    },
};