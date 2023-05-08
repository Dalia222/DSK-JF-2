import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("/register", { username, email, password })
        .then((res) => {
          console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <p style={{ color: "red" }}>error</p>
      <form method="POST" onSubmit={submit}>
        <div>
          <label htmlFor="username">Username : </label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email : </label>
          <input
            type="text"
            id="email"
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password : </label>
          <input
            type="text"
            id="password"
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <button>Submit</button>
      </form>
      <br />
      <p>-- or --</p>
      <Link to="/">Log in</Link>
    </>
  );
};

export default SignUp;
