import axios from "axios";
import { useRef } from "react";
import UserForm from "components/UserForm";

function LoginPage({ hasAccount, setHasAccount }) {
    const formRef = useRef();
    
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let data = {}; 
        const formData = new FormData(formRef.current);
        formData.forEach((value, key) => data[key] = value);
        
        const route = hasAccount ? "login" : "register"
        const apiURL = `http://localhost:3000/user/${route}`;

        try {
            const res = await axios({
                method: "post",
                url: apiURL,
                data: data,
            });

            console.log(res);
        } catch (err) {
            console.error(err);
        }
    }

    const handleUserFormChange = () => {
        formRef.current.reset()
        setHasAccount(prev => !prev);
    }

    return (
        <main>
            <h1>{ hasAccount ? "Login" : "Register" }</h1>
            
            <UserForm hasAccount={hasAccount} formRef={formRef} handleFormSubmit={handleFormSubmit} />

            { hasAccount && (<p>Don't have an account? <a onClick={handleUserFormChange}>Register</a></p>) }
            { !hasAccount && (<p>Already have an account? <a onClick={handleUserFormChange}>Log in</a></p>) }
        </main>
    );
}

export default LoginPage;