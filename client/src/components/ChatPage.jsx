import useAuth from "hooks/useAuth";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useSocket from "hooks/useSocket";
import useAxiosSecure from "hooks/useAxiosSecure";
import Chat from "components/Chat";
import NewChatOptions from "components/NewChatOptions";
import ContactsContext from "context/ContactsContext";

function ChatPage() {
    const socket = useSocket();
    const {  logout } = useAuth();
    const [isConnected, setIsConnected] = useState(false);
    const { isChatting, currentChat } = useContext(ContactsContext);

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
        <main className="grow overflow-hidden">
            <div className="flex flex-col max-w-screen h-full">
                <section className={`mt-4 w-full ${ isChatting ? "hidden" : "" }`}>
                    <Outlet />
                    <NewChatOptions />
                </section>
                <section className="w-full h-full">
                    { isChatting && <Chat />}
                    
                </section>
            </div>
        </main>
    );
}

export default ChatPage;