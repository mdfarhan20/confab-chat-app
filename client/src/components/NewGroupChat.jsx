import { useState, useEffect } from "react";
import useAxiosSecure from "hooks/useAxiosSecure";
import ContactCheckBox from "components/ContactCheckBox";

function NewGroupChat() {
    const axiosSecure = useAxiosSecure();
    const [contacts, setContacts] = useState([]);

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

    const handleGroupCreation = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        console.log(formData);
    }

    return (
        <div>
            <form onSubmit={handleGroupCreation}>
                <div className="m-4 flex items-center justify-between">
                    <input 
                        type="text"
                        placeholder="Group Name"
                        required
                        className="grow px-4 py-2 text-lg bg-sky-100 outline-none rounded-lg mr-2" 
                    />
                    <button type="submit" className="border-2 rounded-lg text-white bg-slate-900 px-4 py-2">Create</button>    
                </div>

                <ul className="grid gap-4 m-4">
                    { contacts.map((contact) => (
                        <ContactCheckBox contact={contact} />
                    )) }
                </ul>
            </form>
        </div>
    );
}

export default NewGroupChat;