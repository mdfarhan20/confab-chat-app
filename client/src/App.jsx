import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "components/auth/Navbar";
import Home from "components/auth/Home";
import Login from "components/auth/Login";
import Register from "components/auth/Register";
import ChatPage from "components/chat/ChatPage";
import UserSearchBar from "components/contact/UserSearchBar";
import ContactsList from "components/contact/ContactsList";
import AuthRequired from "components/auth/AuthRequired";
import { ContactsProvider } from "context/ContactsContext";
import NewGroupChat from "components/chat/NewGroupChat";

function App() {

  return (
    <>
      <ContactsProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route element={<AuthRequired />}>
            <Route path="chat" element={<ChatPage />}>
                <Route path="" element={<ContactsList />} />
                <Route path="new-chat" element={<UserSearchBar />} />
                <Route path="new-group" element={<NewGroupChat />} />
            </Route>
          </Route>
        </Routes>
      </ContactsProvider>
    </>
  );
}

export default App;
