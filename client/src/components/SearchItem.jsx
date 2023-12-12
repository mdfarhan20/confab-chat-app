import { useState } from "react";
import { HiUserAdd as AddContactIcon } from "react-icons/hi";
import { FaUserCheck as ContactAddedIcon } from "react-icons/fa";

function SearchItem({ user, addContact }) {
    const [isAdded, setIsAdded] = useState(false);

    const handleContactAddition = () => {
        setIsAdded(true);
        addContact(user.id);
    }

    return (
        <li className="flex justify-between p-3 border-1 border-gray-200 shadow-sm rounded-md cursor-pointer hover:border-slate-900 duration-150">
            <p className="font-medium text-lg text-slate-900 tracking-wider">
                { user.name }<span className="block font-normal text-sm text-slate-500">{ user.username }</span>
            </p>

            <button 
                onClick={handleContactAddition}
            >
                { !isAdded ? (
                    <AddContactIcon 
                        size="2rem" 
                        className="fill-slate-700" 
                    />
                    ) : (
                        <ContactAddedIcon 
                            size="2rem" 
                            className="fill-slate-700 p-1" 
                        />
                    )
                }
            </button>
        </li>
    );
}

export default SearchItem;