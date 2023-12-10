import SearchItem from "components/SearchItem";

function SearchList({ searchResult, addContact }) {
    return (
        <ul>
            {searchResult.map(user => (
                <SearchItem key={user.id} user={user} addContact={addContact} />
            ))}
        </ul>
    );
}

export default SearchList;