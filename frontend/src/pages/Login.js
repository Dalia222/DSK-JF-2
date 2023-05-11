import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import formValidation from "../helper/formValidation";
import Cookies from "js-cookie";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const Login = () => {
  const [email, setEmail] = useState("");
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

    // Check if the user is the admin
    if (email.toLowerCase() === "admin" && password === "Admin") {
      // Perform admin login actions
      // ...
    } else {
      try {
        const response = await axios.post("/login", { email, password });
        const token = response.data.token;
        Cookies.set("token", token, { expires: 1 });

        if (response.data.msg === "Logged in successfully") {
          document.getElementById("form").reset();
        } else if (response.data.msg === "Not exist") {
          error.innerText = "Wrong Email";
        } else if (response.data.msg === "Wrong password") {
          error.innerText = "Wrong Password";
        } else {
          error.innerText = "Error";
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <main>
      <h1>Log in</h1>
      <p style={{ color: "red" }} id="error"></p>
      <form onSubmit={handleSubmit} id="form">
        <div>
          <input
            type="text"
            name="email"
            id="emailField"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value.toLowerCase().trim())}
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            id="passwordField"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value.trim())}
          />
        </div>

        <button type="submit">Login</button>
      </form>
      <br />
      <p>-- or --</p>
      <Link to="/signup">Sign Up</Link>
    </main>
  );
};

export default Login;
