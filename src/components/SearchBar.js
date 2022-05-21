import React, { useState } from "react";

export function SearchBar(props) {
    const buttonMargin = {
        marginLeft: '-40px'
    }
    const [searchTerm, setTerm] = useState('');
    const handleChange = (event) => {
        setTerm(event.target.value);
    }
    const termList = searchTerm.split(" ");
    let fullTerm = "";
    const termKeys = termList.map((term) => {
        if (fullTerm.length > 0){
            fullTerm += (" " + term );
        } else {
            fullTerm = term;
        }
        for (const key in props.criteria) {
            for (const item of props.criteria[key]) {
                if (item.toLocaleLowerCase() === fullTerm.toLocaleLowerCase()) {
                    fullTerm = "";
                    let result = {};
                    result[key] = item;
                    return result;
                }
            }
        }
        return null;
    }).filter((e) => {
        return e != null;
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        props.getSearchQueryCallback(searchTerm);
    }
    return (
        <form className="form-inline" onSubmit={handleSubmit}>
            <div className="input-group d-flex">
                <input id="searchBox" className="form-control rounded-pill border-end-0" placeholder={props.placeholder} value={searchTerm} onChange={handleChange} />
                <span className="input-group-append">
                    <button id="submitButton" className="btn btn-outline-none bg-transparent" type='submit' style={buttonMargin} >
                        <i className="bi bi-search"></i>
                    </button>
                </span>
            </div>
        </form>
    );
}