import { BsFillSendFill } from "react-icons/bs";

function ChatInput() {
    return (
        <section className="w-full flex p-4 gap-4">
            <input 
                type="text"
                placeholder="Type your message here"
                className="grow py-2 px-4 rounded-full outline-none bg-sky-100"
            />
            <button>
                <BsFillSendFill />
            </button>
        </section>
    );
}

export default ChatInput;