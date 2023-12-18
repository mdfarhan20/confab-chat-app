import useAuth from "hooks/useAuth";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useSocket from "hooks/useSocket";
import Chat from "components/chat/Chat";
import NewChatOptions from "components/chat/NewChatOptions";
import ContactsContext from "context/ContactsContext";
import EmptyChat from "components/chat/EmptyChat";

function ChatPage() {
    const socket = useSocket();
    const {  logout } = useAuth();
    const [isConnected, setIsConnected] = useState(false);
    const { isChatting } = useContext(ContactsContext);

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
            <div className="flex flex-col max-w-screen h-full md:flex-row p-4">
                <section className={`hide-scrollbar overflow-y-scroll h-full md:relative w-full ${ isChatting ? "hidden md:block" : "" }`}>
                    <Outlet />
                    <NewChatOptions />
                </section>
                <section className="w-full h-full">
                    { isChatting && <Chat />} 
                    { !isChatting && <EmptyChat />}
                </section>
            </div>
        </main>
    );
}

export default ChatPage;