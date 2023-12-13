import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "components/Navbar";
import Home from "components/Home";
import Login from "components/Login";
import Register from "components/Register";
import ChatPage from "components/ChatPage";
import UserSearchBar from "components/UserSearchBar";
import ContactsList from "components/ContactsList";
import AuthRequired from "components/AuthRequired";
import { ContactsProvider } from "context/ContactsContext";

function App() {

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>

      <ContactsProvider>
        <Routes>
          <Route element={<AuthRequired />}>
            <Route path="chat" element={<ChatPage />}>
                <Route path="" element={<ContactsList />} />
                <Route path="newchat" element={<UserSearchBar />} />
            </Route>
          </Route>
        </Routes>
      </ContactsProvider>
    </>
  );
}

export default App;
