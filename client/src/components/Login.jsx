import axios from "api/axios";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import UserForm from "components/UserForm";
import UserFormInput from "components/UserFormInput";

function Login({  }) {
    const formRef = useRef();
    const { auth, setAuth }  = useAuth();
    const navigate = useNavigate();
    
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let data = {}; 
        const formData = new FormData(formRef.current);
        formData.forEach((value, key) => data[key] = value);

        try {
            const res = await axios.post("/user/login", { ...data });
            setAuth( {user: res.data} );
            navigate("/chat");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <main>
            <h1>Login</h1>
            
            <UserForm handleFormSubmit={handleFormSubmit} formRef={formRef}>
                <UserFormInput 
                    name="username"
                    type="text"
                />

                <UserFormInput
                    name="password"
                    type="password"
                />

                <button type="submit">Login</button>
            </UserForm>

            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </main>
    );
}

export default Login;