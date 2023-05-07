import React from "react";

const SignUp = () => {
  return (
    <>
      <h1>Sign Up</h1>
      <from action="/signUp/post" method="post">
        <div>
          <label htmlFor="email">Email : </label>
          <input type="text" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password : </label>
          <input type="text" id="password" />
        </div>
        <button>Submit</button>
      </from>
    </>
  );
};

export default SignUp;
