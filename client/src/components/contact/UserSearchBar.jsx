import useAuth from "hooks/useAuth";
import useAxiosSecure from "hooks/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import SearchList from "components/contact/SearchList";
import ContactsContext from "context/ContactsContext";
import AppContext from "context/AppContext";
import socket from "api/socket";
import useSocket from "hooks/useSocket";

function UserSearchBar() {
    const socket = useSocket();
    const { auth } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { contacts, setContacts } = useContext(ContactsContext);
    const [searchString, setSearchString] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const { addNotification } = useContext(AppContext);

    useEffect(() => {
        let isMounted = true;

        const getUsers = async () => {
            const apiPath = `/users/search?username=${searchString}`;
            try {
                const res = await axiosSecure.get(apiPath);
                console.log(res.data)
                isMounted && setSearchResult(res.data.users.filter(user => user.id !== auth.user.id));
            } catch (err) {
                console.log(err);
                addNotification(err.response.data.message, true);
            }
        }

        getUsers();

        return () => {
            isMounted = false;
        }
    }, [searchString]);

    const addContact = async (id) => {
        try {
            const res = await axiosSecure.post("/contact", {
                contact: id
            });
            socket.emit("added-contact", id);
            const contactRes = await axiosSecure.get("/contact");
            setContacts(contactRes.data.contacts);
            addNotification("Contact added successfully");
        } catch (err) {
            console.log(err);
            addNotification(err.response.data.message, true);
        }
    }

    return (
        <>
            <input 
                type="text"
                onChange={(e) => setSearchString(e.target.value)} 
                placeholder="Search users"
                className="w-full px-4 py-1 outline-none"
            />
            <SearchList searchResult={searchResult} addContact={addContact} />
        </>
    );
}

export default UserSearchBar;