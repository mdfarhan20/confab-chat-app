import { useEffect, useState, useContext } from "react";
import useAxiosSecure from "hooks/useAxiosSecure";
import Contact from "components/Contact";
import ContactsContext from "context/ContactsContext";

function ContactsList() {
    const axiosSecure = useAxiosSecure();
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await axiosSecure.get("/contact");
                setContacts(res.data.contacts);
            } catch (err) {
                console.log(err);
            }
        }

        fetchContacts();
    }, []);

    useEffect(() => {
        setFilteredContacts(contacts);
    }, [contacts]);

    const handleContactFilter = (e) => {
        const searchKey = e.target.value
        const filteredList = contacts.filter(contact => contact.contact.username.startsWith(searchKey));
        setFilteredContacts(filteredList);
    }

    return (
        <div className="w-full">
            <input 
                type="text"
                placeholder="Search Contacts"
                onChange={handleContactFilter}
                className="w-full px-4 py-1 outline-none"
            />

            { 
                filteredContacts.length > 0 ?  
                    <ul className="p-4 grid gap-4">
                        {filteredContacts.map((contact) => (
                            <Contact key={contact._id} contact={contact} />
                        ))}
                    </ul>
                : <p className="text-center text-gray-400 my-4">No Contacts Found</p>
            }
        </div>
    );
}

export default ContactsList;