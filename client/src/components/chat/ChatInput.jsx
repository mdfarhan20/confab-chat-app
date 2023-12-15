import { BsFillSendFill } from "react-icons/bs";

function ChatInput({ sendMessage, chatInputRef }) {
    return (
        <form className="w-full flex p-4 gap-4 justify-self-end" onSubmit={sendMessage}>
            <input 
                type="text"
                placeholder="Type your message here"
                autoFocus
                ref={chatInputRef}
                className="grow py-2 px-4 rounded-full outline-none bg-sky-100"
            />
            <button type="submit">
                <BsFillSendFill />
            </button>
        </form>
    );
}

export default ChatInput;