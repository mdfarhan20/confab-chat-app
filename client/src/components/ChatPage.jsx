import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";
import useSocket from "hooks/useSocket";
import UserSearchBar from "components/UserSearchBar";
import ContactsList from "components/ContactsList";
import Chat from "components/Chat";
import useAxiosSecure from "hooks/useAxiosSecure";

function ChatPage() {
    const socket = useSocket();
    const { auth, logout } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isConnected, setIsConnected] = useState(false);
    const [contacts, setContacts] = useState([]);

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
            <section>
                <UserSearchBar addContact={addContact} />
                <ContactsList contacts={contacts} setContacts={setContacts} />
            </section>

            <Chat />
        </main>
    );
}

export default ChatPage;