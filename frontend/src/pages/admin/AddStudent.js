import React, { useState } from "react";
import axios from "axios";
import formValidation from "../../helper/formValidation";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const AddStudent = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are not empty
    const form = document.querySelector("form");
    const error = document.getElementById("error");

    if (formValidation(form)) {
      error.innerHTML = formValidation(form);
      return;
    } else {
      error.innerHTML = "";
    }

    // Check student information
    try {
      const response = await axios.post("/admin/add/student", {
        username,
        email,
        password,
      });

      if (response.data.msg === "Student added") {
        document.getElementById("form").reset();
      } else if (response.data.msg === "Username is Taken") {
        error.innerHTML = response.data.msg;
      } else if (response.data.msg === "Email is Taken") {
        error.innerHTML = response.data.msg;
      } else {
        error.innerHTML = "Error"; // Redirect to a check connection page
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <h1>Add Student Page</h1>
      <p id="error" style={{ color: "red" }}></p>
      <form onSubmit={handleSubmit} id="form">
        <div>
          <label htmlFor="usernameField">Username:</label>
          <input
            type="text"
            id="usernameField"
            name="username"
            onChange={(e) => setUsername(e.target.value.toLowerCase().trim())}
          />
        </div>

        <div>
          <label htmlFor="emailField">Email:</label>
          <input
            type="text"
            id="emailField"
            name="email"
            onChange={(e) => setEmail(e.target.value.toLowerCase().trim())}
          />
        </div>

        <div>
          <label htmlFor="passwordField">Password:</label>
          <input
            type="password"
            id="passwordField"
            name="password"
            onChange={(e) => setPassword(e.target.value.trim())}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default AddStudent;
