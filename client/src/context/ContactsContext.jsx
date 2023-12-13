import { createContext, useState } from "react";

const ContactsContext = createContext();

export function ContactsProvider({ children }) {
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState({});

    return (
        <ContactsContext.Provider value={{contacts, setContacts, currentChat, setCurrentChat}}>
            { children }
        </ContactsContext.Provider>
    );
}

export default ContactsContext;
