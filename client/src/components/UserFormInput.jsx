
function UserFormInput({ name, type }) {
    return (
        <div>
            <label className="capitalize" htmlFor={name}>{ name }</label>
            <input 
                type={type}
                name={name}
                required
            />
        </div>
    );
}

export default UserFormInput;