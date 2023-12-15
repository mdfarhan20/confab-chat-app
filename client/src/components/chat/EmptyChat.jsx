import { PiChatsFill as ChatBubbleIcon } from "react-icons/pi";

function EmptyChat() {
    return (
        <div className="hidden max-h-screen rounded-lg border-2 border-slate-800 text-center h-full gap-2 place-content-center md:grid md:grow">
            <div className="grid place-content-center">
                <ChatBubbleIcon size="10rem" className="aspect-square" />
            </div>
            <h3 className="text-xl font-semibold">Start Chatting</h3>
            <p className="text-slate-600">Select a contact or group to chat</p>
        </div>
    );
}

export default EmptyChat;