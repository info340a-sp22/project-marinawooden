import React, { useState } from "react";
import { SearchPage } from "./SearchPage";
import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProfilePage from "./ProfilePage";
import { Login } from "./Login";


export default function App(props) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);

    const handleLogin = (userData) => {
        console.log(userData);
        setUserId(userData);
        setLoggedIn(true);
    };
    

    return (
        <Routes>
            <Route path="login" element={<Login uname={props.uname} loginCallback={handleLogin}/>} />
            <Route path="profile" element={
                (loggedIn) ? <ProfilePage artist={userId}/> : <Navigate to="/login" />
            } />
            <Route path="*" element={
                <SearchPage criteria={props.criteria} dataSet={props.dataSet} />
            } />
        </Routes>
    )
}