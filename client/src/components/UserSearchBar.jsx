import useAuth from "hooks/useAuth";
import useAxiosSecure from "hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import SearchList from "components/SearchList";

function UserSearchBar({ addContact }) {
    const { auth } = useAuth();
    const axiosSecure = useAxiosSecure();
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

    return (
        <>
            <input type="text" onChange={(e) => setSearchString(e.target.value)} />
            <SearchList searchResult={searchResult} addContact={addContact} />
        </>
    );
}

export default UserSearchBar;