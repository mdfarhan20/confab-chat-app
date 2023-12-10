
function UserFormInput({ name, type }) {
    return (
        <div className="">
            {/* <label className="capitalize font-medium" htmlFor={name}>{ name }</label> */}
            <input 
                type={type}
                name={name}
                required
                placeholder={name}
                className="px-4 py-2 text-md border-1 border-black rounded-md w-full placeholder:capitalize"
            />
        </div>
    );
}

export default UserFormInput;