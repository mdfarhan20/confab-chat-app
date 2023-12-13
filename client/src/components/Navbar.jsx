import ContactsContext from "context/ContactsContext";
import useAuth from "hooks/useAuth";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const { auth, logout } = useAuth();
    const { setCurrentChat, setIsChatting } = useContext(ContactsContext); 

    const handleLogout = () => {
        setCurrentChat({});
        setIsChatting(false);
        return logout();
    }

    return (
        <nav className="py-4 flex justify-between items-center border-b-1 border-gray-200 px-4 md:px-8">
            <h1 className="text-gray-800 text-2xl font-semibold">Confab</h1>

            { !auth.user && 
                <ul className="flex gap-4 items-center">
                    <li className="hover:text-blue-500 duration-100"><Link to="/login">Login</Link></li>
                    <li className="border-2 border-blue-400 bg-blue-400 px-2 py-1 rounded-md text-white">
                        <Link to="/register">Register</Link>
                    </li>
                </ul>
            }

            { auth.user && <button 
                className="border-2 border-blue-400 bg-blue-400 px-2 py-1 rounded-md text-white" 
                onClick={handleLogout}
                >Logout</button> }
        </nav>
    );
}

export default Navbar;
