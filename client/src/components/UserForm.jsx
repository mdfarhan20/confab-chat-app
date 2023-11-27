
function UserForm({ children, handleFormSubmit, formRef }) {

    return (
        <form onSubmit={handleFormSubmit} ref={formRef}>  
            { children }
        </form>
    );
}

export default UserForm;