import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

export function SearchBar(props) {
    const buttonMargin = {
        marginLeft: '-40px'
    }
    const [searchTerm, setTerm] = useSearchParams();
    const [barValue, setBarValue] = useState("");
    const handleChange = (event) => {
        setBarValue(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setTerm({search_query: [event.target.elements.searchBox.value]});
    }
    return (
        <form className="form-inline" onSubmit={handleSubmit}>
            <div className="input-group d-flex">
                <input name="searchBox" className="form-control rounded-pill border-end-0" placeholder={props.placeholder} value={barValue} onChange={handleChange} />
                <span className="input-group-append">
                    <button id="submitButton" className="btn btn-outline-none bg-transparent" type='submit' style={buttonMargin} >
                        <i className="bi bi-search"></i>
                    </button>
                </span>
            </div>
        </form>
    );
}