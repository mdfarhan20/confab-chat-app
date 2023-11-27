import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "components/Navbar";
import Home from "components/Home";
import Login from "components/Login";
import Register from "components/Register";
import ChatPage from "components/ChatPage";
import AuthRequired from "components/AuthRequired";

function App() {

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route element={<AuthRequired />}>
          <Route path="chat" element={<ChatPage />} />
        </Route>
      </Routes>

    </>
  );
}

export default App;
