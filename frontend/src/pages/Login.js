import React, { useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/login", { email, password }).then((res) => {

      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Log in</h1>
      <p style={{ color: "red", display: "none" }} id="error">
        error
      </p>
      <form method="POST" onSubmit={submit}>
        <div>
          <input
            type="text"
            name="email"
            id=""
            placeholder=" Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            name="password"
            id=""
            placeholder=" Password"
            onChange={(e) => setpassword(e.target.value)}
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
