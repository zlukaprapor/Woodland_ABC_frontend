export const formStyles = {
    form: {
        maxWidth: "100%",
        width: "100%",
        margin: "2rem auto",
        padding: "1rem",
        background: "#fff7e6",
        borderRadius: "1rem",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        boxSizing: "border-box",
    },
    input: {
        width: "100%",
        padding: "0.5rem",
        margin: "0.5rem 0",
        borderRadius: "0.5rem",
        border: "1px solid #ccc",
        boxSizing: "border-box",
        display: "block",
    },
    inputGroup: {
        position: "relative",
        width: "100%",
        boxSizing: "border-box",
    },
    button: {
        backgroundColor: "#ffa500",
        color: "white",
        padding: "0.5rem",
        borderRadius: "0.5rem",
        border: "none",
        cursor: "pointer",
        fontWeight: "bold",
        width: "100%",
        marginTop: "1rem",
        boxSizing: "border-box",
    },
    toggleButton: {
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        background: "transparent",
        border: "none",
        color: "#ffa500",
        cursor: "pointer",
    },
    error: {
        color: "red",
        marginTop: "1rem",
    },
    success: {
        color: "green",
        marginTop: "1rem",
    },
};


export const pageStyles = {
    container: {
        backgroundImage: "url('/home.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Comic Sans MS', cursive, sans-serif",
    },
    card: {
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        padding: "40px",
        borderRadius: "24px",
        textAlign: "center",
        boxShadow: "0 0 20px rgba(0,0,0,0.2)",
    },
    title: {
        fontSize: "2.5rem",
        marginBottom: "10px",
        color: "#ff7043",
    },
    subtitle: {
        fontSize: "1.2rem",
        color: "#555",
        marginBottom: "30px",
    },
};
