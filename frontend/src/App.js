import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState({});

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login user={user} setUser={setUser} />} />
        <Route
          path="/signup"
          element={<SignUp user={user} setUser={setUser} />}
        />
        <Route path="/home" element={<Home user={user} setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
