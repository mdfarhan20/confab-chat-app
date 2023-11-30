import axios from "api/axios";
import useAuth from "hooks/useAuth";

function useRefreshToken() {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        try {
            const res = await axios.post("/auth/refresh", { id: auth.user.id }, { 
                withCredentials: true
            });

            setAuth(prev => { return { ...prev, accessToken: res.data.accessToken } });
            return res.data.accessToken;
        } catch (err) {
            console.log(err);
        }
    }

    return refresh;
}

export default useRefreshToken;