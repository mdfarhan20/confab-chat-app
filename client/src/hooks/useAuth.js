import AuthContext from "context/AuthContext.jsx";
import { useContext } from "react";

function useAuth() {
    return useContext(AuthContext);
}

export default useAuth;