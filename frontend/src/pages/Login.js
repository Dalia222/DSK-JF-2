import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import formValidation from "../helper/formValidation";
import Cookies from "js-cookie";
import styles from "../assets/style/SignUp.module.css";
import avatar from "../assets/images/profile.png";

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
      <div className="container" style={{ display: "flex" }}>
        <div className={styles.flex}>
          <div
            className={styles.glass}
            style={{ width: "100%", margin: "10% 0 0 110% " }}
          >
            <div className={styles.title}>
              <h4>Hello Again!</h4>
              <span className={styles.message}>
                Explore More by connecting with us.
              </span>
            </div>
            <form onSubmit={handleSubmit} id="form">
              <div className={styles.profile}>
                <img src={avatar} className={styles.profile_img} alt="avatar" />
              </div>
              <div className={styles.textboxContainer}>
                <div>
                  <input
                    className={styles.textbox}
                    type="text"
                    name="email"
                    id="emailField"
                    placeholder="Email*"
                    onChange={(e) =>
                      setEmail(e.target.value.toLowerCase().trim())
                    }
                  />
                </div>

                <div>
                  <input
                    className={styles.textbox}
                    type="password"
                    name="password"
                    id="passwordField"
                    placeholder="Password*"
                    onChange={(e) => setPassword(e.target.value.trim())}
                  />
                </div>

                <button className={styles.btn} onClick={handleSubmit}>
                  Submit
                </button>
                <p
                  className={styles.errors}
                  style={{ color: "red" }}
                  id="error"
                ></p>
              </div>
              <div style={{ textAlign: "center", padding: "5px 0" }}>
                <span style={{ color: "rgb(107 114 128)" }}>
                  {" "}
                  Not a Member?
                  <Link
                    className="text-red-500"
                    to="./signup"
                    style={{ color: "rgb(239 68 68)", textDecoration: "none" }}
                  >
                    {" "}
                    Register Now{" "}
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
