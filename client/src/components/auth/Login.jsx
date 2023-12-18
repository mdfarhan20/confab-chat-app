import axios from "api/axios";
import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import UserForm from "components/contact/UserForm";
import UserFormInput from "components/contact/UserFormInput";
import AppContext from "context/AppContext";

function Login() {
    const formRef = useRef();
    const { setAuth }  = useAuth();
    const navigate = useNavigate();
    const { addNotification } = useContext(AppContext);
    
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let data = {}; 
        const formData = new FormData(formRef.current);
        formData.forEach((value, key) => data[key] = value);

        try {
            const res = await axios.post("/auth/login", { ...data });
            console.log(res.data.user)
            setAuth({ user: res.data.user});
            addNotification("Login Successfull");
            navigate("/chat");
        } catch (err) {
            addNotification(err.response.data.message, true);
            console.error(err.response.data.message);
        }
    }

    return (
        <main className="grow grid place-content-center">
            <div className="grid gap-6 w-base max-w-90">
                <h1 className="text-3xl text-center uppercase font-semibold">Login</h1>
                
                <UserForm handleFormSubmit={handleFormSubmit} formRef={formRef}>
                    <UserFormInput 
                        name="username"
                        type="text"
                    />

                    <UserFormInput
                        name="password"
                        type="password"
                    />

                    <button className="bg-blue-400 text-white p-2 font-semibold rounded-lg" type="submit">Login</button>
                </UserForm>

                <p className="text-center">Don't have an account? <Link className="text-purple-600 underline" to="/register">Register</Link></p>
            </div>
        </main>
    );
}

export default Login;