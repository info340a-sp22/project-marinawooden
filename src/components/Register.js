import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, setTimeActive } from "firebase/auth";
import USER_DEFAULTS from "../data/userdefaults.json";
import { getDatabase, onValue, push, ref, set as firebaseSet } from "firebase/database";

export default function Register() {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, "/profiles");

    onValue(usersRef, (snapshot) => {
      setUserId(Object.keys(snapshot.val()).length + 1);
    });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    let { email, pass } = document.forms[0];
    const user = email.value;
    const password = pass.value;

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, user, password)
      .then((cred) => {
        return createUser(cred, userId);
      })
      .then(addUserToDatabase)
      .then(() => {
        sendEmailVerification(auth.currentUser)   
          .then(() => {
            navigate("/");
          }).catch((err) => alert(err.message))
      })
      .catch((error) => {
        alert("Those credentials are already in use")
        navigate("/login");
      });
  }

  return (
    <div className="app d-flex align-items-center justify-content-center">
      <div className="login-form">
        <div className="title">Sign Up</div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Email </label>
              <input type="text" name="email" required />
            </div>
            <div className="input-container">
              <label>New Password </label>
              <input type="password" name="pass" required />
            </div>
            <div className="button-container">
              <input type="submit" />
            </div>
            <div className="mt-3">
              <p className="small-text text-center">
                Already signed up?
                <Link to='/login'> Log in here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function addUserToDatabase(user) {
  const db = getDatabase();
  const profilesRef = ref(db, '/profiles');
  const newProfileRef = push(profilesRef);
  firebaseSet(newProfileRef, user);
}

function createUser(userCredential, userId) {
  const user = userCredential.user;
  let newUser = {...USER_DEFAULTS};
  newUser["id"] = userId;
  newUser["email"] = user.email;

  return newUser;
}