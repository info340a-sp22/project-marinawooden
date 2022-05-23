import React from "react";
import {  Link } from "react-router-dom";

function NavBar(){
    return (
    <nav className="navbar" style={{backgroundColor: "black"}} aria-label="navigation">
        <a className="logo" href="#"><img src="img/logo.png" className="img-responsive ml-3 p-2"
        alt="MusicRoom logo" width="60" height="60"/></a>
        <ul className="d-none d-md-flex nav justify-content-end" aria-label="navigation">
            <li>
            <Link to="/profile" className="nav-item mx-2 mt-2 p-1" style={{color:"white"}}>Profile</Link>
            </li>
            <li>
            <Link to="/*" className="nav-item mx-2 mt-2 p-1" style={{color:"white"}}>Search</Link>
            </li>
            <li>
            <Link to="/" className="nav-item mx-2 mt-2 p-1" style={{color:"white"}}>About</Link>
            </li>
        </ul>
    </nav>
    )
}

export default NavBar;