import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import useSocket from "hooks/useSocket";
import useAxiosSecure from "hooks/useAxiosSecure";
import UserSearchBar from "components/UserSearchBar";
import ContactsList from "components/ContactsList";
import Chat from "components/Chat";
import NewChatOptions from "components/NewChatOptions";

function ChatPage() {
    const socket = useSocket();
    const { auth, logout } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isConnected, setIsConnected] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState({});

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

    const addContact = async (id) => {
        try {
            const res = await axiosSecure.post("/contact", {
                contact: id
            });
            const updatedContacts = [...contacts, res.data.contact];
            setContacts(updatedContacts);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <main>
            <div className="grid max-w-screen my-4">
                <section className="w-full">
                    <Routes location="/chat">
                        <Route path="/" element={
                            <ContactsList
                                contacts={contacts}
                                setContacts={setContacts} 
                            />
                        } />

                        <Route path="/newchat" element={
                            <UserSearchBar />
                        } />
                    </Routes>
                    
                    <NewChatOptions />
                </section>
                <section className="w-full hidden lg:block">
                    <Chat />
                </section>
            </div>
        </main>
    );
}

export default ChatPage;