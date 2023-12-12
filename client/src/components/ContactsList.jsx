import { useEffect, useState } from "react";
import useAxiosSecure from "hooks/useAxiosSecure";
import Contact from "components/Contact";

function ContactsList({ contacts, setContacts }) {
    const axiosSecure = useAxiosSecure();
    const [filteredContacts, setFilteredContacts] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const fetchContacts = async () => {
            try {
                const res = await axiosSecure.get("/contact");
                isMounted && setContacts(res.data.contacts);
                isMounted && setFilteredContacts(res.data.contacts);
            } catch (err) {
                console.log(err);
            }
        }

        fetchContacts();

        return () => {
            isMounted = false;
        }
    }, []);

    useEffect(() => {
        console.log("Contacts is changing");
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