import React from "react";

const AddInstructor = () => {
  const submit = async (e) => {
    e.preventDefault();
  };

  return (
    <form method="POST" onSubmit={submit} id="form">
      <div>
        <label htmlFor="firstName">First Name : </label>
        <input type="text" id="firstName" name="firstName" />
      </div>
      <div>
        <label htmlFor="lastName">Last Name : </label>
        <input type="text" id="lastName" name="lastName" />
      </div>
      <div>
        <label htmlFor="email">Email : </label>
        <input type="text" id="email" name="email" />
      </div>
      <div>
        <label htmlFor="password">Password : </label>
        <input type="text" id="password" name="password" />
      </div>
      <button>Submit</button>
    </form>
  );
};

export default AddInstructor;
