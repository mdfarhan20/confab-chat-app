import useAuth from "hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";

function AuthRequired() {
    const { auth } = useAuth();

    return (
        auth.user ? <Outlet /> : <Navigate to="/login" />
    );
};

export default AuthRequired;