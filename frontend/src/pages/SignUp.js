import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import formValidation from "../helper/formValidation";
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const SignUp = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    //check if all fields are not empty
    const form = document.querySelector("form");
    const error = document.getElementById("error");
    if (formValidation(form)) {
      error.innerHTML = formValidation(form);
      return;
    } else error.innerHTML = "";
    //check about the user information
    try {
      await axios
        .post("/register", { username, email, password })
        .then((res) => {
          if (res.data.msg === "User added") {
            document.getElementById("form").reset();
            props.setUser(res.data.user);//                                               <--- make it more professional
            navigate("/home");
          } else if (res.data.msg === "Username is Taken")
            error.innerHTML = `${res.data.msg}`;
          else if (res.data.msg === "Email is Taken")
            error.innerHTML = `${res.data.msg}`;
          else error.innerHTML = "Error";//                                                      <---redirect to a check connection page
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <p style={{ color: "red" }} id="error"></p>
      <form method="POST" id="form">
        <div>
          <label htmlFor="usernameField">Username : </label>
          <input
            type="text"
            id="usernameField"
            name="username"
            onChange={(e) => setUsername(e.target.value.trim())}//                 <--- check username on change in database
          />
        </div>
        <div>
          <label htmlFor="emailField">Email : </label>
          <input
            type="text"
            id="emailField"
            name="email"
            onChange={(e) => setEmail(e.target.value.trim())}//                 <--- check email on change in database
          />
        </div>
        <div>
          <label htmlFor="password">Password : </label>
          <input
            type="text"
            id="passwordField"
            name="password"
            onChange={(e) => setPassword(e.target.value.trim())}
          />
        </div>
        <button onClick={submit}>Submit</button>
      </form>
      <br />
      <p>-- or --</p>
      <Link to="/">Log in</Link>
    </>
  );
};

export default SignUp;
