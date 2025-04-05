import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>👋 Вітаємо у “Лісовій абетці”!</h1>
                <p style={styles.subtitle}>Навчайся граючись 🌲🦊</p>
                <Button onClick={() => navigate("/register")} text="Реєстрація" />
                <Button onClick={() => navigate("/login")} text="Увійти" color="#66bb6a" />
            </div>
        </div>
    );
}

const styles = {
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
