import { useState, useEffect } from "react";
import useAxiosSecure from "hooks/useAxiosSecure";
import ContactCheckBox from "components/contact/ContactCheckBox";
import { useNavigate } from "react-router-dom";

function NewGroupChat() {
    const axiosSecure = useAxiosSecure();
    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await axiosSecure.get("/contact");
                setContacts(res.data.contacts.filter(contact => !contact.roomId.isGroup));
            } catch (err) {
                console.log(err);
            }
        }

        fetchContacts();
    }, []);

    const handleGroupCreation = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const roomName = formData.get("group-name");
        const contacts = formData.getAll("group-contacts").map(data => JSON.parse(data));

        const apiPath = "/contact/group";
        try {
            const res = await axiosSecure.post(apiPath, {
                contacts, roomName
            });
            console.log(res.data);

        } catch (err) {
            console.log(err);
        } finally {
            navigate("/chat");
        }
    }

    return (
        <div>
            <form onSubmit={handleGroupCreation}>
                <div className="m-4 flex items-center justify-between max-w-screen">
                    <input 
                        type="text"
                        name="group-name"
                        placeholder="Group Name"
                        required
                        className="grow min-w-0 px-4 py-2 text-lg bg-sky-100 outline-none rounded-lg mr-2" 
                    />
                    <button type="submit" className="border-2 rounded-lg text-white bg-slate-900 px-4 py-2">Create</button>    
                </div>

                <ul className="grid gap-4 m-4">
                    { contacts.map((contact) => (
                        <ContactCheckBox key={contact._id} contact={contact} />
                    )) }
                </ul>
            </form>
        </div>
    );
}

export default NewGroupChat;