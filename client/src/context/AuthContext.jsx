import useAxiosSecure from "hooks/useAxiosSecure";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({});
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    async function logout() {
        const apiPath = "/auth/logout";
        try {
            const res = await axiosSecure.put(apiPath);
            setAuth({});
        } catch (err) {
            console.log(err);
        } finally {
            navigate("/login");
        }
    }

    return (
        <AuthContext.Provider value={ {auth, setAuth, logout} } >
            { children }
        </AuthContext.Provider>
    ); 
}

export default AuthContext;