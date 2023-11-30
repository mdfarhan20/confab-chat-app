import axios from "api/axios";
import useAuth from "hooks/useAuth";
import { useEffect } from "react";
import UserSearchBar from "./UserSearchBar";

function ChatPage() {
    const { auth } = useAuth();

    return (
        <main>
            <h1>Hello, { auth.user.name } </h1>
            <UserSearchBar />
        </main>
    );
}

export default ChatPage;