import { createContext, useState } from "react";

const ContactsContext = createContext();

export function ContactsProvider({ children }) {
    const [contacts, setContacts] = useState([]);

    return (
        <ContactsContext.Provider value={{contacts, setContacts}}>
            { children }
        </ContactsContext.Provider>
    );
}

export default ContactsContext;
