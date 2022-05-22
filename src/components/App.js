import React from "react";
import { SearchPage } from "./SearchPage";
import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route } from 'react-router-dom';
import { ProfilePage } from "./ProfilePage";
import { Login } from "./Login";


export default function App(props) {
    
    return (
        <Routes>
            <Route path="login" element={<Login uname={props.uname}/>} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="*" element={
                <SearchPage criteria={props.criteria} dataSet={props.dataSet} />
            } />
        </Routes>
    )
}