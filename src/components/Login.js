import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import USERS from "../data/users.json";

import "../index.css";

export function Login(props) {
    // States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [username, setUsername] = useState(null);

    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        var { uname, pass } = document.forms[0];

        // Find user login info
        const userData = USERS.find((user) => user.username === uname.value);

        // Compare user info
        if (userData) {
          if (userData.password !== pass.value) {
              // Invalid password
              setErrorMessages({ name: "pass", message: errors.pass });
          } else {
              setUsername(userData.userid);
              setIsSubmitted(true);
              props.loginCallback(userData.userid);
          }
        } else {
        // Username not found
        setErrorMessages({ name: "uname", message: errors.uname });
        }
    };

  // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
    const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
// <div>You have successfully logged in</div>
// {isSubmitted ? <div>You have successfully logged in</div> : renderForm} ??????
  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <Navigate to={"/profile/" + username} />  : renderForm}
      </div>
    </div>
  );
}
