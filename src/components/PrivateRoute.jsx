import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getUser } from "../services/authService";

export default function PrivateRoute({ children, requiredRole }) {
    const user = getUser();

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
