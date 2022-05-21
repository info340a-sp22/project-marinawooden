import React from "react";
import { SearchPage } from "./SearchPage";
import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route } from 'react-router-dom';
import { ProfilePage } from "./ProfilePage";


export default function App(props) {
    return (
        <Routes>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="search" element={
                <SearchPage criteria={props.criteria} dataSet={props.dataSet} />
            } />
        </Routes>
    )
}