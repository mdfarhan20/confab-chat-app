import socket from "api/socket";
import useAuth from "./useAuth";

function useSocket() {
    const { auth } = useAuth();

    if (auth.user)
        return socket;
}

export default useSocket;