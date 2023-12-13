import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useSocket from "hooks/useSocket";
import useAxiosSecure from "hooks/useAxiosSecure";
import Chat from "components/Chat";
import NewChatOptions from "components/NewChatOptions";

function ChatPage() {
    const socket = useSocket();
    const {  logout } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        console.log("Connection state:", isConnected);
    }, [isConnected]);

    useEffect(() => {
        console.log(socket);

        socket.on("connect", () => {
            setIsConnected(true);
        });

        socket.on("disconnect", async () => {
            setIsConnected(false);
            await logout();
        });

        return () => {
            socket.removeAllListeners("connect");
            socket.removeAllListeners("disconnect");
        }
    }, []);


    return (
        <main>
            <div className="grid max-w-screen my-4">
                {/* <section className="w-full">
                    <Outlet />
                    <NewChatOptions />
                </section> */}
                <section className="w-full lg:block">
                    <Chat />
                </section>
            </div>
        </main>
    );
}

export default ChatPage;