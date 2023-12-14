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
import NewGroupChat from "components/NewGroupChat";

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
