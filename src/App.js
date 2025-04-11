import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import UserDashboard from "./pages/UserDashboard"; // твоя захищена сторінка
import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <UserDashboard />
                        </PrivateRoute>
                    }
                />
                {/* Захищена сторінка для адміна */}
                <Route
                    path="/admin"
                    element={
                        <PrivateRoute requiredRole="admin">
                            <AdminDashboard />
                        </PrivateRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;

