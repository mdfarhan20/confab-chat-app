import axios from "api/axios";
import useAuth from "hooks/useAuth";

function useRefreshToken() {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        try {
            const res = await axios.post("/auth/refresh", { id: auth.user.id }, { 
                withCredentials: true
            });

            setAuth(prev => { 
                const update = { 
                    user: { ...prev.user, accessToken: res.data.accessToken } 
                };
                console.log("Updated Auth:", update);
                return update;
            });
            return res.data.accessToken;
        } catch (err) {
            console.log(err);
        }
    }

    return refresh;
}

export default useRefreshToken;