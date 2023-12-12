
function Contact({ contact }) {
    return (
        <li className="p-3 border-1 border-gray-200 shadow-sm rounded-md cursor-pointer hover:border-slate-900 duration-150">
            <h3 className="font-medium text-lg text-slate-900 tracking-wider">{ contact.contact.name }</h3>
            <p className="text-sm text-slate-500">{ contact.contact.username }</p>
        </li>
    )
}

export default Contact;