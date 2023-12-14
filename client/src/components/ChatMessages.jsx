import Message from "components/Message";

function ChatMessages({ messages }) {
    return (
        <ul className="overflow-y-scroll flex flex-col justify-end gap-2 mx-4">
            {messages.map(message => (
                <Message 
                    key={message.id} 
                    message={message} 
                />
            ))}
        </ul>
    );
}

export default ChatMessages;