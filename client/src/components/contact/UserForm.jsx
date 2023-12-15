
function UserForm({ children, handleFormSubmit, formRef }) {

    return (
        <form className="grid gap-4 w-full" onSubmit={handleFormSubmit} ref={formRef}>  
            { children }
        </form>
    );
}

export default UserForm;