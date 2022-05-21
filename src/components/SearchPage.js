import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { SearchResult } from "./SearchResult";

export function SearchPage(props) {
    const [searchParam, setParam] = useSearchParams();
    const [searchTerms, setTerms] = useState(null);
    function applySearch() {
        setTerms("termKeys");
    }
    function getSearchQuery(query) {
        setParam({ "search_query": [query] });
    }
    console.log(searchParam.get('search_query'));
    return (
        <div className="bg-dark">
            <header className="container-fluid p-3 mb-3 text-white">
                <div className="container">
                    <div className="justify-content-md-start">
                        <h1>Search</h1>
                        <SearchBar placeholder="Search skills, genres, or schools..."  getSearchQueryCallback={getSearchQuery} />
                    </div>
                </div>
            </header>
            <main>
                <section className="container-fluid">
                    <SearchResult queryString={searchParam.get('search_query')} dataSet={props.dataSet} criteria={props.criteria}/>
                </section>
            </main>
        </div>
    )
}