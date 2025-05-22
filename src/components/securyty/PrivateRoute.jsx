import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getUser } from "../../services/authService.jsx";

/**
 * Компонент маршруту з обмеженим доступом (PrivateRoute).
 * Забезпечує доступ до дочірнього елемента лише для автентифікованих користувачів.
 * Якщо вказано `requiredRole`, додатково перевіряє, чи користувач має потрібну роль.
 *
 * @component
 * @param {Object} props - Вхідні параметри компонента.
 * @param {React.ReactNode} props.children - Дочірній компонент (сторінка), який потрібно показати при наявності доступу.
 * @param {string} [props.requiredRole] - (Необов'язковий) Роль, яка потрібна для перегляду сторінки (наприклад, "admin" або "user").
 *
 * @returns {JSX.Element} Компонент маршруту: або `children`, або перенаправлення на `/login` чи `/dashboard`.
 */
export default function PrivateRoute({ children, requiredRole }) {
    const user = getUser();

    // Якщо користувач неавтентифікований — перенаправити на сторінку входу
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    // Якщо потрібно перевірити роль і вона не збігається — перенаправити на загальну панель
    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/dashboard" replace />;
    }

    // Якщо всі перевірки пройдено — надати доступ до дочірнього елемента
    return children;
}
