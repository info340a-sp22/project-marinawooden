import React from "react";
import { SearchBar } from "./SearchBar";

export default function App(props) {
    return (
        <header className="bg-dark">
            <SearchBar placeholder="Search skills, genres, or schools..."/>
        </header>
        // <main>
        //     <SearchResult />
        // </main>
    )
}