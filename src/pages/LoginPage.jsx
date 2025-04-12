import LoginForm from "../components/LoginForm";
import { registerUser } from "../api/auth.jsx";

export default function LoginPage() {
    const handleAuth = async (formData) => {
        return await registerUser(formData);
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <LoginForm isLogin={true} handleAuth={handleAuth} />
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
};
