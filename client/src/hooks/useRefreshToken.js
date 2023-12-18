import axios from "api/axios";
import useAuth from "hooks/useAuth";

function useRefreshToken() {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        console.log("User:", auth);
        try {
            const res = await axios.post("/auth/refresh", { id: auth.user.id }, { 
                withCredentials: true
            });


            const updatedAuth = { 
                user: { ...(auth.user), accessToken: res.data.accessToken } 
            };
            console.log("Updated Auth:", update);
            setAuth(updatedAuth);
            return res.data.accessToken;
        } catch (err) {
            console.log(err);
        }
    }

    return refresh;
}

export default useRefreshToken;