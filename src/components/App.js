import React, { useState } from "react";
import { SearchPage } from "./SearchPage";
import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProfilePage from "./ProfilePage";
import { Login } from "./Login";
import { NavBar } from "./NavBar";
<<<<<<< HEAD
=======
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
>>>>>>> main


export default function App(props) {
    const [userId, setUserId] = useState(null);
<<<<<<< HEAD

    const handleLogin = (userData) => {
        setUserId(userData);
        setLoggedIn(true);
    };

    return (
        <Routes>
            <Route path="login" element={<Login uname={props.uname} loginCallback={handleLogin}/>} />
            <Route path='navbar' element={<NavBar />} />
            <Route path="profile" element={
                (loggedIn) ? <ProfilePage artist={userId}/> : <Navigate to="/login" />
            } />
=======
    const handleLogin = (user) => {
        setUserId(user);
    }
    return (
        <Routes>
            <Route path="/login" element={userId !== null ? <Navigate to={"/profile/" + userId} /> : <Login uname={props.uname} loginCallback={handleLogin}/>} />
            <Route path="/profile/:artistId" element={<ProfilePage />} />
>>>>>>> main
            <Route path="*" element={
                <SearchPage criteria={props.criteria} dataSet={props.dataSet} />
            } />
        </Routes>
    )
}