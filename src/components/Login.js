import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import "../index.css";

export function Login(props) {
    const uname = props.uname;
    const pass = props.pass;

    // States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // example database
    const database = [
        {
          userid: "1",
          username: "user1",
          password: "pass1"
        },
        {
          userid: "2",
          username: "user2",
          password: "pass2"
        }
    ];

    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        var { uname, pass } = document.forms[0];

        // Find user login info
        const userData = database.find((user) => user.username === uname.value);

        // Compare user info
        if (userData) {
          if (userData.password !== pass.value) {
              // Invalid password
              setErrorMessages({ name: "pass", message: errors.pass });
          } else {
              props.loginCallback(userData.userid); // replace with user id
              setIsSubmitted(true);            
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
        {isSubmitted ? <Navigate to="/profile" />  : renderForm}
      </div>
    </div>
  );
}
