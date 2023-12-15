import SearchItem from "components/contact/SearchItem";

function SearchList({ searchResult, addContact }) {
    return (
        <div>
            {   searchResult.length > 0 ?
                (<ul className="p-4 grid gap-4">
                    {searchResult.map(user => (
                        <SearchItem key={user.id} user={user} addContact={addContact} />
                    ))}
                </ul>) : <p className="text-center text-gray-400 my-4">No Users Found</p>
            }
        </div>
    );
}

export default SearchList;