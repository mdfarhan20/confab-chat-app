import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "components/Navbar";
import Home from "components/Home";
import LoginPage from "components/LoginPage";

function App() {
  const [hasAccount, setHasAccount] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

    </>
  );
}

export default App;
