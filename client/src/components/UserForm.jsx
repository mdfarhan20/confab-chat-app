import UserFormInput from "components/UserFormInput";

function UserForm({ hasAccount, formRef, handleFormSubmit }) {

    return (
        <form onSubmit={handleFormSubmit} ref={formRef}>  
            { !hasAccount && <UserFormInput
                type="text"
                name="name"
            /> }

            <UserFormInput
                type="text"
                name="username"
            />
            
            <UserFormInput
                type="password"
                name="password"
            />

            <button type="submit">{ hasAccount ? "Login" : "Register" }</button>
        </form>
    );
}

export default UserForm;