import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const AddInstructor = (props) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const form = document.querySelector("form");
    const error = document.getElementById("error");

    for (let input of Array.from(form.elements)) {
      if (input.value === "") {
        let text = input.name.trim();
        text = text.charAt(0).toUpperCase() + text.slice(1);
        for (let i = 1; i < text.length; i++) {
          if (text[i] === text[i].toUpperCase()) {
            text = text.substring(0, i) + " " + text.substring(i, text.length);
            error.innerHTML = text + " is required";
            break;
          }
        }
      }
    }
  };

  return (
    <>
      <p id="error" style={{ color: "red" }}></p>
      <form method="POST" id="form" onSubmit={submit}>
        <div>
          <label htmlFor="firstnameField">First Name : </label>
          <input
            type="text"
            id="firstNameField"
            name="firstName"
            onChange={(e) => setFirstname(e.target.value.trim())}
          />
        </div>
        <div>
          <label htmlFor="lastnameField">Last Name : </label>
          <input
            type="text"
            id="lastNameField"
            name="lastName"
            onChange={(e) => setLastname(e.target.value.trim())}
          />
        </div>
        <div>
          <label htmlFor="usernameField">Username : </label>
          <input
            type="text"
            id="usernameField"
            name="username"
            onChange={(e) => setUsername(e.target.value.trim())}
          />
        </div>
        <div>
          <label htmlFor="emailField">Email : </label>
          <input
            type="text"
            id="emailField"
            name="email"
            onChange={(e) => setEmail(e.target.value.trim())}
          />
        </div>
        <div>
          <label htmlFor="passwordField">Password : </label>
          <input
            type="text"
            id="passwordField"
            name="password"
            onChange={(e) => setPassword(e.target.value.trim())}
          />
        </div>
        <button>Submit</button>
      </form>
    </>
  );
};

export default AddInstructor;
