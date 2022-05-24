import React from "react";
import { useState } from "react";
import {  Link } from "react-router-dom";
import Popper from "popper.js";
import { loggedIn } from "./Login";



function NavBar(){
    // set login button
    var userLogin = "";
    if(loggedIn != true) {
        userLogin = "Login";
    } else {
        userLogin = "Account";
    }

    // paths for hamburger menu
    const paths = [
        {path:"/about", text:"About"},
        {path:"/login", text:userLogin},
        {path:"/*", text:"Search"},
    ] //style={{ textDecoration: 'none' }}
    return (
    <nav className="navbar" style={{backgroundColor:"#5D3FD3"}} aria-label="navigation">
        <a className="logo" href="#"><img src="img/logo.png" className="img-responsive ml-3 p-2"
        alt="MusicRoom logo" width="60" height="60"/></a>
        <div className="d-md-none">
            <HamBurgerNav paths={paths}/>
        </div>
        <ul className="d-none d-md-flex nav justify-content-end" aria-label="navigation">
            <li>
            <Link to="/login" className="nav-item mx-2 mt-2 p-1" style={{color:"white", textDecoration: 'none' }}>{userLogin}</Link>
            </li>
            <li>
            <Link to="/*" className="nav-item mx-2 mt-2 p-1" style={{color:"white", textDecoration: 'none' }}>Search</Link>
            </li>
            <li>
            <Link to="/about" className="nav-item mx-2 mt-2 p-1" style={{color:"white", textDecoration: 'none' }}>About</Link>
            </li>
        </ul>
    </nav>
    )
}

function HamBurgerNav({paths}) {
    const size = {
        fontSize: "xx-large"
    }
    // paths [{path: path, text: text}]
    const items = paths.map((e) => {
        return (
            <li key={e.text} className="mb-3">
                <Link className="dropdown-item" to={e.path} style={{color:"white"}}>{e.text}</Link>
            </li>
        )
    })
    return (
        <div className="dropdown">
            <button className="btn border-0 bg-transparent" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                <i style={size} className="bi bi-list text-white"></i>
            </button>
            <ul style={{backgroundColor: "black"}} className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                {items}
            </ul>
        </div>
    )
}

export default NavBar;
