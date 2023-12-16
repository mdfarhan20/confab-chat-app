import { useContext, useEffect, useRef, useState } from "react";
import ChatInfoHeader from "components/chat/ChatInfoHeader";
import ChatMessages from "components/chat/ChatMessages";
import ChatInput from "components/chat/ChatInput";
import ContactsContext from "context/ContactsContext";
import useAxiosSecure from "hooks/useAxiosSecure";
import useSocket from "hooks/useSocket";
import useAuth from "hooks/useAuth";

function Chat() {
    const axiosSecure = useAxiosSecure();
    const { currentChat } = useContext(ContactsContext);
    const [messages, setMessages] = useState([]);
    const chatInputRef = useRef();
    const socket = useSocket();
    const { auth } = useAuth();

    useEffect(() => {
        socket.emit("contact-change", currentChat.roomId._id);

        const getMessages = async () => {
            const apiPath = `/message?roomId=${currentChat.roomId._id}`;
            try {
                const res = await axiosSecure.get(apiPath);
                setMessages(res.data.messages);
            } catch (err) {
                console.log(err);
            }
        }

        getMessages();
    }, [currentChat]); 

    useEffect(() => {
        let isMounted = true;
        socket.on("recieve-message", (message) => {
            console.log("Recieved Message");
            isMounted && setMessages(prev => [...prev, message]);
        });

        return () => {
            isMounted = false;
        }
    }, []);

    const sendMessage = async (e) => {
        e.preventDefault();
        const message = chatInputRef.current.value;
        if (!message || message === "")
            return;

        const messageData =  {
            body: message,
            roomId: currentChat.roomId._id,
            userId: { _id: auth.user.id, username: auth.user.username }
        };
        socket.emit("send-message", messageData);
        chatInputRef.current.value = "";

        const apiPath = '/message';
        try {
            const res = await axiosSecure.post(apiPath, messageData);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="h-full flex flex-col max-h-screen">
            <ChatInfoHeader chat={currentChat} />

            <ChatMessages messages={messages} />
            
            <ChatInput sendMessage={sendMessage} chatInputRef={chatInputRef} />
        </div>
    );
}

export default Chat;

