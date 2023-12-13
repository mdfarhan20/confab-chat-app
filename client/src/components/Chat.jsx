import { useContext, useEffect, useState } from "react";
import ChatInfoHeader from "components/ChatInfoHeader";
import ChatMessages from "components/ChatMessages";
import ChatInput from "components/ChatInput";
import ContactsContext from "context/ContactsContext";
import useAxiosSecure from "hooks/useAxiosSecure";

function Chat() {
    const axiosSecure = useAxiosSecure();
    const { currentChat } = useContext(ContactsContext);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const getMessages = async () => {
            const apiPath = "/message";
            try {
                const res = await axiosSecure.get(apiPath, {
                    roomId: currentChat.roomId,
                });
            } catch (err) {
                console.log(err);
            }
        }

        getMessages();
    }, []); 

    return (
        <div>
            <ChatInfoHeader chat={currentChat} />

            <ChatMessages />

            <ChatInput />
        </div>
    );
}

export default Chat;

