import axios from "api/axios";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserForm from "components/UserForm";
import UserFormInput from "components/UserFormInput";

function Register() {
    const formRef = useRef();
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let data = {}; 
        const formData = new FormData(formRef.current);
        formData.forEach((value, key) => data[key] = value);

        try {
            const res = await axios.post("/auth/register", { ...data });
            console.log(res);
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <main>
            <h1>Register</h1>
            
            <UserForm handleFormSubmit={handleFormSubmit} formRef={formRef}>
                <UserFormInput 
                    name="name"
                    type="text"
                />

                <UserFormInput 
                    name="username"
                    type="text"
                />

                <UserFormInput
                    name="password"
                    type="password"
                />

                <button type="submit">Register</button>
            </UserForm>

            <p>Already have an account? <Link to="/login">Login</Link></p>
        </main>
    );
}

export default Register;