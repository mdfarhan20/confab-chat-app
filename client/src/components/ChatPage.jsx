import useAuth from "hooks/useAuth";

function ChatPage() {
    const { auth } = useAuth();

    return (
        <main>
            <h1>Hello, { auth.name } </h1>
        </main>
    );
}

export default ChatPage;