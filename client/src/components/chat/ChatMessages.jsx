import Message from "components/chat/Message";
import { useEffect, useRef } from "react";

function ChatMessages({ messages }) {
    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current.scrollIntoView();
    }, [messages]);

    return (
        <ul className="mt-auto overflow-y-scroll grid gap-2 mx-4 hide-scrollbar">
            {messages.map(message => (
                <Message 
                    key={message._id} 
                    message={message} 
                />
            ))}
            <div ref={scrollRef}></div>
        </ul>
    );
}

export default ChatMessages;