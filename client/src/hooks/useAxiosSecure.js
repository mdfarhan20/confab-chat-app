import { axiosSecure } from "api/axios";
import useRefreshToken from "hooks/useRefreshToken";
import { useEffect } from "react";
import useAuth from "./useAuth";

function useAxiosSecure() {
    const { auth } = useAuth();
    const refresh = useRefreshToken();

    useEffect(() => {
        const requestIntercept = axiosSecure.interceptors.request.use((req) => {
            if (!req.headers.Authorization) {
                console.log("request sending");
                req.headers.Authorization = `Bearer ${auth.user.accessToken}`;
            }
            return req;
        }, (error) => Promise.reject(error));

        const responseIntercept = axiosSecure.interceptors.response.use((res) => res,
            async (error) => {
                console.log("response error");
                console.log(error.response);
                const prevRequest = error.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axiosSecure(prevRequest);
                }
                return Promise.reject(error);
            }
        );
        
        return () => {
            axiosSecure.interceptors.request.eject(requestIntercept);
            axiosSecure.interceptors.response.eject(responseIntercept);
        }

    }, [auth, refresh]);

    return axiosSecure;
}

export default useAxiosSecure;