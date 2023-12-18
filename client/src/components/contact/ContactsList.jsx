import { useEffect, useState, useContext } from "react";
import useAxiosSecure from "hooks/useAxiosSecure";
import Contact from "components/contact/Contact";
import ContactsContext from "context/ContactsContext";
import AppContext from "context/AppContext";

function ContactsList() {
    const axiosSecure = useAxiosSecure();
    const { contacts, setContacts } = useContext(ContactsContext);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const { addNotification } = useContext(AppContext);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await axiosSecure.get("/contact");
                setContacts(res.data.contacts);
            } catch (err) {
                console.log(err);
                addNotification(err.response.data.message, true);
            }
        }

        fetchContacts();
    }, []);

    useEffect(() => {
        setFilteredContacts(contacts);
    }, [contacts]);

    const handleContactFilter = (e) => {
        const searchKey = e.target.value
        const filteredList = contacts.filter(contact => (contact.roomId.name.startsWith(searchKey) || contact.contact?.username?.startsWith(searchKey)));
        setFilteredContacts(filteredList);
    }

    return (
        <div className="w-full">
            <input 
                type="text"
                placeholder="Search Contacts"
                onChange={handleContactFilter}
                className="w-full px-4 py-1 outline-none mb-4"
            />

            { 
                filteredContacts.length > 0 ?  
                    <ul className="grid gap-4">
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