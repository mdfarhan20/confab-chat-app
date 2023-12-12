import useAuth from "hooks/useAuth";
import { Link } from "react-router-dom";

function Navbar() {
    const { auth, logout } = useAuth();

    return (
        <nav className="h-14 flex justify-between items-center border-b-1 border-gray-200 px-4 md:px-8">
            <h1 className="text-gray-800 text-2xl font-semibold"><Link to="/">Confab</Link></h1>

            { !auth.user && 
                <ul className="flex gap-4 items-center">
                    <li className="hover:text-blue-500 duration-100"><Link to="/login">Login</Link></li>
                    <li className="border-2 border-blue-400 bg-blue-400 px-2 py-1 rounded-md text-white">
                        <Link to="/register">Register</Link>
                    </li>
                </ul>
            }

            { auth.user && <button className="border-2 border-blue-400 bg-blue-400 px-2 py-1 rounded-md text-white" onClick={logout}>Logout</button> }
        </nav>
    );
}

export default Navbar;
