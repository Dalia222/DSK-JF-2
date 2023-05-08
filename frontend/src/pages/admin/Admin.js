import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <>
      <h1>Admin Panel</h1>
      <nav>
        <ul>
            <li><Link to="/admin/student">Student</Link></li>
            <li><Link to="/admin/instructor">Instructor</Link></li>
            <li><Link to="/admin/course">Course</Link></li>
        </ul>
      </nav>
    </>
  );
};

export default Admin;
