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
                <Route
                    path="/lesson/:lessonId"
                    element={
                        <PrivateRoute>
                            <LessonPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <PrivateRoute requiredRole="admin">
                            <AdminDashboard />
                        </PrivateRoute>
                    }
                />
                {/* Додайте цей маршрут для списку уроків */}
                <Route
                    path="/admin/lessons"
                    element={
                        <PrivateRoute requiredRole="admin">
                            <LessonsListPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/lessons/create"
                    element={
                        <PrivateRoute requiredRole="admin">
                            <CreateLessonPage />
                        </PrivateRoute>
                    }
                />
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