import Message from "components/Message";

function ChatMessages({ messages }) {
    return (
        <ul className="grow overflow-y-scroll flex flex-col justify-end gap-2">
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