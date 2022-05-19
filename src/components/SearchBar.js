import React, { useState } from "react";

export function SearchBar(props) {
    const buttonMargin = {
        marginLeft: '-40px'
    }
    const [searchTerm, setTerm] = useState('');
    const handleChange = (event) => {
        setTerm(event.target.value);
    }
    return (
        <div className="container mb-3">
            <form>
                <div className="input-group">
                    <input id="searchBox" type="search" className="form-control rounded-pill border-end-0" placeholder={props.placeholder} value={searchTerm} onChange={handleChange}/>
                    <span className="input-group-append">
                        <button id="submitButton" className="btn btn-outline-none bg-transparent" type='submit' style={buttonMargin}>
                            <i className="bi bi-search"></i>
                        </button>
                    </span>
                </div>
            </form>
        </div>
    );
}