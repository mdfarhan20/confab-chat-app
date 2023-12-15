import { useContext, useEffect } from "react";
import ContactsContext from "context/ContactsContext";
import useAuth from "hooks/useAuth";

function Message({ message }) {
    const { auth } = useAuth();
    const { currentChat } = useContext(ContactsContext);

    console.log(message);

    const isLoggedUser = message.userId === auth.user.id;

    return (
        <li className={`self-end dui-chat ${ isLoggedUser ? "dui-chat-end" : "dui-chat-start justify-self-start"}`}>
            <p className="dui-chat-header">{ isLoggedUser ? auth.user.username : message.userId.username }</p>
            <p className={`dui-chat-bubble ${isLoggedUser ? "bg-blue-400" : "bg-sky-600"}`}>{ message.body }</p>
        </li>
    );
}

export default Message;