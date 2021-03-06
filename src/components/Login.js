import React, { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import USERS from "../data/users.json";
import Cookies from 'universal-cookie';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import { propTypes } from "react-bootstrap/esm/Image";

let loggedIn = false;

export function Login() {
    const cookies = new Cookies();
    // States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [userId, setUserId] = useState(cookies.get("userHash"));
    const [users, setUsers] = useState([]);

    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };

    useEffect(() => {
      const db = getDatabase();
      const userRef = ref(db, "/profiles");

      onValue(userRef, (snapshot) => {
        setUsers(snapshot.val());
      })
    }, [])

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        var { email, pass } = document.forms[0];

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email.value, pass.value)
          .then((userCredential) => {
            /** CORRECT CREDENTIALS CASE */
            const user = userCredential["user"];
            return user.email;
          })
          .then((mail) => {
            const userInfo = Object.values(users).find(elem => elem["email"] === mail);
            const userHash = Object.keys(users).find(key => users[key] === userInfo);

            let now = new Date();
            now.setTime(now.getTime() + 1 * 3600 * 1000);
            
            cookies.set('userHash', userHash, { path: '/' , expires: now});

            setIsSubmitted(true);
            setUserId(userHash);
          })
          .catch((error) => {
            /** WRONG CREDENTIALS CASE */
            alert("Those were the wrong credentials");
          });
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
          <label>Email </label>
          <input type="text" name="email" required />
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
        <div className="mt-3">
          <p className="small-text text-center">
            Don't have an account?
            <Link to='/register'> Create one here</Link>
          </p>
        </div>
      </form>
      
    </div>
  );

  return (
    <div className="app d-flex align-items-center justify-content-center">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <Navigate to={"/profile/" + userId} /> : renderForm} 
      </div>
    </div>
  );
}

export {loggedIn};

export function LogOut(props) {
  let cookie = new Cookies();
  return (
    <div>
      <button onClick={cookie.remove("userHash")}>
      <Navigate to={"/about"} />  
      </button>
    </div>
  )
}