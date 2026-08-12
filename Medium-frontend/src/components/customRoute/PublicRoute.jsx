import React from 'react'
import { Navigate } from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";

const PublicRoute = ({ children }) => {
    const { user } = useAuth();

    console.log("PUBLIC ROUTE USER =", user);

    if (user) {
        console.log("REDIRECTING TO HOME");
        return <Navigate to="/home" replace />;
    }

    return children;
};
export default PublicRoute
