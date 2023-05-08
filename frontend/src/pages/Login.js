import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const emailField = document.getElementById("emailField");
    const passwordField = document.getElementById("passwordField");
    const error = document.getElementById("error");

    if (emailField.value === "") error.innerText = "Email can't be empty";
    else if (passwordField.value === "")
      error.innerText = "Password can't be empty";

    if (emailField.value === "" || passwordField.value === "") {
      error.style.display = "block";
    } else if (
      emailField.value === "Admin" &&
      passwordField.value === "Admin"
    ) {
      navigate("/admin");
    } else {
      error.style.display = "hidden";
      try {
        await axios.post("/login", { email, password }).then((res) => {
          if (res.data.msg === "not exists") error.innerText = "Wrong Email";
          else if (res.data.msg === "wrong password")
            error.innerText = "Wrong password";

          if (
            res.data.msg === "not exists" ||
            res.data.msg === "wrong password"
          ) {
            error.style.display = "block";
          } else {
            error.style.display = "none";
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
      <h1>Log in</h1>
      <p style={{ color: "red" }} id="error"></p>
      <form method="POST" onSubmit={submit} id="form">
        <div>
          <input
            type="text"
            name="email"
            id="emailField"
            placeholder=" Email"
            onChange={(e) => setEmail(e.target.value.trim())}
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
