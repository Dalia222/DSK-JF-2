import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import formValidation from "../helper/formValidation";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    //check if all fields are not empty
    const form = document.querySelector("form");
    const error = document.getElementById("error");
    if (formValidation(form)) {
      error.innerHTML = formValidation(form);
      return;
    } else error.innerHTML = "";

    //check if the user is the admin  
    if (
      document.getElementById("emailField").value === "Admin" &&
      document.getElementById("passwordField").value === "Admin"
    )

    //check about the user information
    try {
      await axios.post("/login", { email, password }).then((res) => {
        if (res.data.msg === "Logged in successfully") {
          document.getElementById("form").reset();
        } else if (res.data.msg === "Not exist")
          error.innerText = "Wrong Email";
        else if (res.data.msg === "Wrong password")
          error.innerText = "Wrong Password";
        else error.innerText = "Error";
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Log in</h1>
      <p style={{ color: "red" }} id="error"></p>
      <form method="POST" onSubmit={submit} id="form">

        <div>
          <input
            type="text"
            name="email"
            id="emailField"
            placeholder=" Email"
            onChange={(e) => setEmail(e.target.value.toLowerCase().trim())}
          />
        </div>

        <div>
          <input
            type="text"
            name="password"
            id="passwordField"
            placeholder=" Password"
            onChange={(e) => setpassword(e.target.value.trim())}
          />
        </div>

        <button>Login</button>
        
      </form>
      <br />
      <p>-- or --</p>
      <Link to="/signup">Sign Up</Link>
    </>
  );
};

export default Login;
