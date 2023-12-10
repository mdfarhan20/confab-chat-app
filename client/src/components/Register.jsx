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
        <main className="grow grid place-content-center">
            <div className="grid gap-6 w-base max-w-90">
                <h1 className="text-3xl text-center uppercase font-semibold">Register</h1>
                
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

                    <button className="bg-blue-400 text-white p-2 font-semibold rounded-lg" type="submit">Register</button>
                </UserForm>

                <p className="text-center">Already have an account? <Link className="text-purple-600 underline" to="/login">Login</Link></p>
            </div>
        </main>
    );
}

export default Register;