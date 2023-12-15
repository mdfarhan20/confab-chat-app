import { useState, useRef } from "react";
import Contact from "components/contact/Contact";
import { FaCheck } from "react-icons/fa6";

function ContactCheckBox({ contact }) {
    const checkboxRef = useRef();
    const [checked, setChecked] = useState(false);

    const handleContactCheck = () => {
        setChecked(prev => !prev);
        checkboxRef.current.checked = !checkboxRef.current.checked;
    } 

    return (
        <div className="flex gap-2 items-center w-full">
            <Contact contact={contact} onClick={handleContactCheck} />
            <input 
                type="checkbox"
                name="group-contacts"
                value={JSON.stringify(contact)}
                ref={checkboxRef}
                className="hidden"
            />
            { checked && <div className="h-full px-2 bg-slate-700 grid place-content-center rounded-md" ><FaCheck className="fill-white" /></div>}
        </div>
    );
}

export default ContactCheckBox;