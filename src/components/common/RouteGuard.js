import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../../contexts/authContext";
import { useContext } from "react";

export const RouteGuard = ({
    children,
}) => {
    const { isAuthenticated } = useContext(AuthContext);
    
    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }

    return children ? children : <Outlet />
};