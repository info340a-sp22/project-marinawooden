import React from "react";
import { SearchPage} from "./SearchPage";
import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route } from 'react-router-dom'


export default function App(props) {
    return (
        <Routes>
            <Route path="search" element={<SearchPage criteria={props.criteria} dataSet={props.dataSet} />} />
        </Routes>
    )
}