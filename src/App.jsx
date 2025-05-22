import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./components/auth/RegisterPage.jsx";
import LoginPage from "./components/auth/LoginPage.jsx";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoute from "./components/securyty/PrivateRoute.jsx";
import LessonsListPage from "./components/admin/LessonsListPage";
import CreateLessonPage from "./components/admin/CreateLessonPage";
import EditLessonPage from "./components/admin/EditLessonPage";
import LessonPage from "./components/lesson/LessonPage.jsx";
import QuizPage from "./components/quiz/QuizPage.jsx";

/**
 * Головний компонент додатку, що містить маршрутизацію сторінок.
 * Використовує React Router для переходів між сторінками.
 * Деякі маршрути захищені через компонент PrivateRoute, що перевіряє автентифікацію
 * та роль користувача.
 */
function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Головна сторінка */}
                <Route path="/" element={<HomePage />} />

                {/* Сторінки реєстрації та входу */}
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Дашборд користувача — доступ лише автентифікованим */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <UserDashboard />
                        </PrivateRoute>
                    }
                />

                {/* Сторінка уроку — доступ лише автентифікованим */}
                <Route
                    path="/lesson/:lessonId"
                    element={
                        <PrivateRoute>
                            <LessonPage />
                        </PrivateRoute>
                    }
                />

                {/* Квіз по уроку — доступ лише автентифікованим */}
                <Route
                    path="/quiz/:lessonId"
                    element={
                        <PrivateRoute>
                            <QuizPage />
                        </PrivateRoute>
                    }
                />

                {/* Адмін панель — доступ лише адміністраторам */}
                <Route
                    path="/admin"
                    element={
                        <PrivateRoute requiredRole="admin">
                            <AdminDashboard />
                        </PrivateRoute>
                    }
                />

                {/* Управління уроками в адмін панелі */}
                <Route
                    path="/admin/lessons"
                    element={
                        <PrivateRoute requiredRole="admin">
                            <LessonsListPage />
                        </PrivateRoute>
                    }
                />

                {/* Створення уроку (адмін) */}
                <Route
                    path="/admin/lessons/create"
                    element={
                        <PrivateRoute requiredRole="admin">
                            <CreateLessonPage />
                        </PrivateRoute>
                    }
                />

                {/* Редагування уроку (адмін) */}
                <Route
                    path="/admin/lessons/edit/:lessonId"
                    element={
                        <PrivateRoute requiredRole="admin">
                            <EditLessonPage />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
