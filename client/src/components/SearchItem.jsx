
function SearchItem({ user, addContact }) {
    return (
        <li>
            <p>{ user.name }<span>{ user.username }</span></p>
            <button onClick={() => addContact(user.id)}>+</button>
        </li>
    );
}

export default SearchItem;