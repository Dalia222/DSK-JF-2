import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Admin from "./pages/admin/Admin";
import AddStudent from "./pages/admin/AddStudent";
import AddInstructor from "./pages/admin/AddInstructor";
import AddCourse from "./pages/admin/AddCourse";

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  
  const [user, setUser] = useState({});

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login user={user} setUser={setUser} />} />
        <Route path="/signup" element={<SignUp user={user} setUser={setUser} />}/>
        <Route path="/home" element={<Home user={user} setUser={setUser} />} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/admin/student" element={<AddStudent/>} />
        <Route path="/admin/instructor" element={<AddInstructor/>} />
        <Route path="/admin/course" element={<AddCourse/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
