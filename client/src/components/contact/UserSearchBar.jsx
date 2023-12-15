import useAuth from "hooks/useAuth";
import useAxiosSecure from "hooks/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import SearchList from "components/contact/SearchList";
import ContactsContext from "context/ContactsContext";

function UserSearchBar() {
    const { auth } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { contacts, setContacts } = useContext(ContactsContext);
    const [searchString, setSearchString] = useState("");
    const [searchResult, setSearchResult] = useState([]);

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
            const updatedContacts = [...contacts, res.data.contact];
            setContacts(updatedContacts);
        } catch (err) {
            console.log(err);
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