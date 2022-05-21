import React, { useState } from "react";
import { SearchBar } from "./SearchBar";
import { SearchPage } from "./SearchPage";
import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route } from 'react-router-dom';


export default function App(props) {
    const [searchTerms, setTerms] = useState(null);
    function applySearch(termKeys) {
        setTerms(termKeys);
    }
    console.log(searchTerms);
    return (
        <Routes>
            <Route path="profile" element={
                <div>
                    <h1>Profile Page to Be Implemented</h1>
                </div>
            } />
            <Route path="*" element={
                <div className="bg-dark">
                    <header className="container-fluid p-3 mb-3 text-white">
                        <div className="container">
                            <h1>Search</h1>
                            <SearchBar placeholder="Search skills, genres, or schools..." criteria={props.criteria} applySearchCallback={applySearch} />
                        </div>
                    </header>
                    <main>
                        <SearchPage searchTerms={searchTerms} dataSet={props.dataSet} />
                    </main>
                </div>
            } />
        </Routes>
    )
}