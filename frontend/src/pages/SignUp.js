import React, { useState } from "react";
import { Link } from "react-router-dom";
import formValidation from "../helper/formValidation";
import axios from "axios";
import avatar from "../assets/images/profile.png";
import convertToBase64 from "../helper/convert";
import styles from "../assets/style/SignUp.module.css";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState();

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
  // Formik doesn't support file upload so we're creating this function
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };
  return (
    <main>
      <div className="container">
        <div className={styles.flex}>
          <div className={styles.glass} style={{ width: "45%" }}>
            <div className={styles.title}>
              <h4>Register</h4>
              <span className={styles.message}>Happy to join you!</span>
            </div>
            <form method="POST" id="form">
              <div className={styles.profile}>
                <label htmlFor="profile">
                  <img
                    className={styles.profile_img}
                    src={file || avatar}
                    alt="avatar"
                  />
                </label>
                <input
                  onChange={onUpload}
                  type="file"
                  name="profile"
                  id="profile"
                />
              </div>
              <div className={styles.textboxContainer}>
                <div>
                  {/* <label htmlFor="usernameField">Username:</label> */}
                  <input
                    className={styles.textbox}
                    type="text"
                    id="usernameField"
                    name="username"
                    placeholder="Username*"
                    onChange={(e) =>
                      setUsername(e.target.value.toLowerCase().trim())
                    }
                  />
                </div>
                <div>
                  {/* <label htmlFor="emailField">Email:</label> */}
                  <input
                    className={styles.textbox}
                    type="text"
                    id="emailField"
                    name="email"
                    placeholder="email*"
                    onChange={(e) =>
                      setEmail(e.target.value.toLowerCase().trim())
                    }
                  />
                </div>

                <div>
                  {/* <label htmlFor="password">Password:</label> */}
                  <input
                    className={styles.textbox}
                    type="password"
                    id="passwordField"
                    name="password"
                    placeholder="Password*"
                    onChange={(e) => setPassword(e.target.value.trim())}
                  />
                </div>

                <div>
                  {/* <label htmlFor="password">Confirm Password:</label> */}
                  <input
                    className={styles.textbox}
                    type="password"
                    id="confirmPasswordField"
                    name="confirmPassword"
                    placeholder="confirmPassword*"
                    onChange={(e) => setConfirmPassword(e.target.value.trim())}
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
                  Already have an account?
                  <Link
                    className="text-red-500"
                    to="../"
                    style={{ color: "rgb(239 68 68)", textDecoration: "none" }}
                  >
                    Login Now
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

export default SignUp;
