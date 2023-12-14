import { createContext, useState } from "react";

const ContactsContext = createContext();

export function ContactsProvider({ children }) {
    const [currentChat, setCurrentChat] = useState({});
    const [isChatting, setIsChatting] = useState(false);

    return (
        <ContactsContext.Provider value={
            {
                currentChat, setCurrentChat,
                isChatting, setIsChatting, 
            }}
        >
            { children }
        </ContactsContext.Provider>
    );
}

export default ContactsContext;
