import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const SignUp = (props) => {
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    let errors = document.querySelector("p");
    const usernameField = document.getElementById("usernameField");
    const emailField = document.getElementById("emailField");
    const passwordField = document.getElementById("passwordField");

    if (usernameField.value === "") {
      errors.innerHTML = "Username can't be empty";
    } else if (emailField.value === "") {
      errors.innerHTML = "Email can't be empty";
    } else if (passwordField.value === "") {
      errors.innerHTML = "Password can't be empty";
    }
    if (
      usernameField.value === "" ||
      emailField.value === "" ||
      passwordField.value === ""
    ) {
      errors.style.display = "block";
    } else {
      errors.style.display = "none";
      try {
        await axios
          .post("/register", { username, email, password })
          .then((res) => {
            if (res.data.msg === "username is Taken") {
              errors.innerHTML = `${res.data.msg}`;
              errors.style.display = "block";
            } else if (res.data.msg === "Email is Taken") {
              errors.innerHTML = `${res.data.msg}`;
              errors.style.display = "block";
            } else {
              errors.style.display = "none";
              document.getElementById("form").reset();
              props.setUser(res.data.user);
              navigate("/home");
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <p style={{ color: "red" }}></p>
      <form method="POST" id="form">
        <div>
          <label htmlFor="username">Username : </label>
          <input
            type="text"
            id="usernameField"
            onChange={(e) => setUsername(e.target.value.trim())}
          />
        </div>
        <div>
          <label htmlFor="email">Email : </label>
          <input
            type="text"
            id="emailField"
            onChange={(e) => setemail(e.target.value.trim())}
          />
        </div>
        <div>
          <label htmlFor="password">Password : </label>
          <input
            type="text"
            id="passwordField"
            onChange={(e) => setpassword(e.target.value.trim())}
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
