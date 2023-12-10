
function Contact({ contact }) {
    return (
        <li>
            <h3 className="font-semibold">{ contact.contact.name }</h3>
            <p className="text-sm">{ contact.contact.username }</p>
        </li>
    )
}

export default Contact;