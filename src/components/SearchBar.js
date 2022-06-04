import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

export function SearchBar(props) {
    const buttonMargin = {
        marginLeft: '-40px'
    }
    const [searchTerm, setTerm] = useSearchParams();

    const handleChange = (event) => {
        setTerm({search_query: [event.target.value]});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <form className="form-inline" onSubmit={handleSubmit}>
            <div className="input-group d-flex">
                <input id="searchBox" className="form-control rounded-pill border-end-0" placeholder={props.placeholder} value={(searchTerm.get('search_query')) ? searchTerm.get('search_query') : ""  } onChange={handleChange} />
                <span className="input-group-append">
                    <button id="submitButton" className="btn btn-outline-none bg-transparent" type='submit' style={buttonMargin} >
                        <i className="bi bi-search"></i>
                    </button>
                </span>
            </div>
        </form>
    );
}