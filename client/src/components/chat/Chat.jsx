import { useContext, useEffect, useRef, useState } from "react";
import ChatInfoHeader from "components/chat/ChatInfoHeader";
import ChatMessages from "components/chat/ChatMessages";
import ChatInput from "components/chat/ChatInput";
import ContactsContext from "context/ContactsContext";
import useAxiosSecure from "hooks/useAxiosSecure";

function Chat() {
    const axiosSecure = useAxiosSecure();
    const { currentChat } = useContext(ContactsContext);
    const [messages, setMessages] = useState([]);
    const chatInputRef = useRef();

    useEffect(() => {
        const getMessages = async () => {
            console.log("Chat: ", currentChat.roomId);
            const apiPath = `/message?roomId=${currentChat.roomId._id}`;
            try {
                const res = await axiosSecure.get(apiPath);
                setMessages(res.data.messages);
            } catch (err) {
                console.log(err);
            }
        }

        getMessages();
    }, []); 

    const sendMessage = async (e) => {
        e.preventDefault();
        const message = chatInputRef.current.value;
        if (!message || message === "")
            return;

        const apiPath = '/message';
        try {
            const res = await axiosSecure.post(apiPath, {
                body: message,
                roomId: currentChat.roomId._id
            });
            setMessages(prev => [...prev, res.data.message]);
            chatInputRef.current.value = "";
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

