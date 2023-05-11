import React, { useState } from "react";
import { Link} from "react-router-dom";
import formValidation from "../helper/formValidation";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

    // Check user information
    try {
      const response = await axios.post("/register", {
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
        error.innerHTML = "Error";
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <h1>Sign Up</h1>
      <p style={{ color: "red" }} id="error"></p>
      <form method="POST" id="form">
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
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="passwordField"
            name="password"
            onChange={(e) => setPassword(e.target.value.trim())}
          />
        </div>

        <div>
          <label htmlFor="password">Confirm Password:</label>
          <input
            type="password"
            id="confirmPasswordField"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value.trim())}
          />
        </div>

        <button onClick={handleSubmit}>Submit</button>
      </form>

      <br />
      <p>-- or --</p>
      <Link to="/">Log in</Link>
    </main>
  );
};

export default SignUp;
