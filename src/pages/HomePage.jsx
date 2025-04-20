import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { pageStyles } from "../styles/commonStyles";

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div style={pageStyles.container}>
            <div style={pageStyles.card}>
                <h1 style={pageStyles.title}>👋 Вітаємо у “Лісовій абетці”!</h1>
                <p style={pageStyles.subtitle}>Навчайся граючись 🌲🦊</p>
                <Button onClick={() => navigate("/register")} text="Реєстрація" />
                <Button onClick={() => navigate("/login")} text="Увійти" color="#66bb6a" />
            </div>
        </div>
    );
}


