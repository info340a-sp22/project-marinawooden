import React from "react";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { SearchResult } from "./SearchResult";
import NavBar from "./NavBar";
import { Footer } from "./Footer";

export function SearchPage(props) {
    const [searchParam, setParam] = useSearchParams({ "search_query": "" });
    function getSearchQuery(query) {
        setParam({ "search_query": [query] });
    }
    return (
        <div className="bg-dark">
            <NavBar/>
            <header className="container-fluid p-3 mb-3 text-white">
                <div className="container">
                    <div className="justify-content-md-start">
                        <h1>Search</h1>
                        <SearchBar placeholder="Search skills, genres, or schools..." initalSearchTerm={searchParam.get('search_query')} getSearchQueryCallback={getSearchQuery} />
                    </div>
                </div>
            </header>
            <main>
                <section className="container-fluid">
                    <SearchResult queryString={searchParam.get('search_query')} dataSet={props.dataSet} criteria={props.criteria}/>
                </section>
            </main>
            <Footer/>
        </div>
    )
}