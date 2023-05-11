import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Admin from "./pages/admin/Admin";
import AddStudent from "./pages/admin/AddStudent";
import AddInstructor from "./pages/admin/AddInstructor";
import AddCourse from "./pages/admin/AddCourse";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/student" element={<AddStudent />} />
        <Route path="/admin/instructor" element={<AddInstructor />} />
        <Route path="/admin/course" element={<AddCourse />} />
      </Routes>
    </Router>
  );
}

export default App;
