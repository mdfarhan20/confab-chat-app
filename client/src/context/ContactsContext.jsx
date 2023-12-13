import { createContext, useState } from "react";

const ContactsContext = createContext();

export function ContactsProvider({ children }) {
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState({});
    const [isChatting, setIsChatting] = useState(false);

    return (
        <ContactsContext.Provider value={
            {
                contacts, setContacts, 
                currentChat, setCurrentChat,
                isChatting, setIsChatting
            }}
        >
            { children }
        </ContactsContext.Provider>
    );
}

export default ContactsContext;
