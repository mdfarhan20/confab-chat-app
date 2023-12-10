import { useEffect } from "react";
import useAxiosSecure from "hooks/useAxiosSecure";
import Contact from "components/Contact";

function ContactsList({ contacts, setContacts }) {
    const axiosSecure = useAxiosSecure();

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

    return (
        <ul>
            {contacts.map((contact) => (
                <Contact key={contact._id} contact={contact} />
            ))}
        </ul>
    );
}

export default ContactsList;