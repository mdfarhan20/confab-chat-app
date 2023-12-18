import useAxiosSecure from "hooks/useAxiosSecure";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({});
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => console.log("Auth:", auth), [auth]);

    async function logout() {
        const apiPath = "/auth/logout";
        try {
            setAuth({});
            const res = await axiosSecure.put(apiPath);
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