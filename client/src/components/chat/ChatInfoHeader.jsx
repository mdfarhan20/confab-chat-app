import { useContext } from "react";
import ContactsContext from "context/ContactsContext";
import { IoMdArrowRoundBack } from "react-icons/io";

function ChatInfoHeader({ chat }) {
    const { setCurrentChat, setIsChatting } = useContext(ContactsContext);
    const isGroup = chat.roomId.isGroup;

    const handleGoBack = () => {
        setCurrentChat({});
        setIsChatting(false);
    }

    return (
        <section className="flex items-center py-2 px-4 mx-4 my-2 rounded-lg bg-slate-800 gap-4 border-2 border-slate-900">
            <button onClick={handleGoBack}>
                <IoMdArrowRoundBack size="2rem" className="fill-gray-200" />
            </button>
            <p className="font-medium text-md text-white tracking-wider leading-5">
                { isGroup ? chat.roomId.name : chat.contact.name }{!isGroup && <span className="block font-thin text-sm text-slate-300">{ chat.contact?.username }</span>}
            </p>
        </section>
    );
}

export default ChatInfoHeader;