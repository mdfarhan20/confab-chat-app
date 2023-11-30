import axios from "api/axios";
import useAxiosSecure from "hooks/useAxiosSecure";
import { useEffect, useState } from "react";

function UserSearchBar() {
    const axiosSecure = useAxiosSecure();
    const [searchString, setSearchString] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            const apiPath = `/users/search?username=${searchString}`;
            try {
                const res = await axiosSecure.get(apiPath, {
                    signal: controller.signal
                });
                console.log(res.data)
                isMounted && setSearchResult(res.data.users);
            } catch (err) {
                console.log(err);
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [searchString]);

    return (
        <div>
            <input type="text" onChange={(e) => setSearchString(e.target.value)} />
            {searchResult.map(user => (
                <p>{ user.username }</p>
            ))}
        </div>
    );
}

export default UserSearchBar;