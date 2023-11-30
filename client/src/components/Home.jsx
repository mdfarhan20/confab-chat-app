import { Link } from "react-router-dom";

function Home() {
    return (
        <main>
            <h1>Welcome to the Chat App</h1>
            <p>Where you can chat..</p>
            <Link to="/login">Login</Link>
        </main>
    );
}

export default Home;