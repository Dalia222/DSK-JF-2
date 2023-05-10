import React, { useState } from "react";
import axios from "axios";
import formValidation from "../../helper/formValidation";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const AddStudent = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    //check if all fields are not empty
    const form = document.querySelector("form");
    const error = document.getElementById("error");
    if (formValidation(form)) {
      error.innerHTML = formValidation(form);
      return;
    } else error.innerHTML = "";

    try {
      await axios
        .post("/admin/add/student", { username, email, password })
        .then((res) => {
          if (res.data.msg === "Student added") {
            document.getElementById("form").reset();
          } else if (res.data.msg === "Username is Taken")
            error.innerHTML = `${res.data.msg}`;
          else if (res.data.msg === "Email is Taken")
            error.innerHTML = `${res.data.msg}`;
          else error.innerHTML = "Error"; //                                                      <---redirect to a check connection page
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Add Student Page</h1>

      <p id="error" style={{ color: "red" }}></p>
      <form method="POST" id="form" onSubmit={submit}>
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

export default AddStudent;
