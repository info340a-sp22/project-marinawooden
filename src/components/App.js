import React, { useState } from "react";
import { SearchBar } from "./SearchBar";
import { SearchPage } from "./SearchPage";
import 'bootstrap/dist/css/bootstrap.css';



export default function App(props) {
    const [searchTerms, setTerms] = useState(null);
    function applySearch(termKeys) {
        setTerms(termKeys);
    }
    console.log(searchTerms);
    return (
        <div className="bg-dark">
            <header className="container-fluid p-3 mb-3 text-white">
                <div className="container">
                    <div className="justify-content-md-start">
                        <h1>Search</h1>
                        <SearchBar placeholder="Search skills, genres, or schools..." criteria={props.criteria} applySearchCallback={applySearch} />
                    </div>
                </div>
            </header>
            <main>
                <section className="container-fluid">
                    <SearchPage searchTerms={searchTerms} dataSet={props.dataSet} />
                </section>
            </main>
        </div>
    )
}