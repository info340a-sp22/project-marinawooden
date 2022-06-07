import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

function NavBar() {
    // set login button
    const cookie = new Cookies();
    let userHash = cookie.get("userHash");
    let logged = false;
    let paths = []
    let path = "";

    let userLogin = "";
    if (!userHash) {
        userLogin = "Login";
    } else {
        userLogin = "Account";
        logged = true;
        path = <a href="/logout" className="nav-item mx-2 mt-2 p-1" style={{ color: "white", textDecoration: "none"}}>Sign Out</a>
    }

    // paths for hamburger menu
    if (logged === true) {
        paths = [
            { path: "/about", text: "About" },
            { path: (userHash ? `profile/${userHash}` : "/login"), text: userLogin },
            { path: "/*", text: "Search" },
            { path: "/logout", text: "Log Out" }
        ]  
        //return paths;
    } else {
        paths = [
            { path: "/about", text: "About" },
            { path: (userHash ? `profile/${userHash}` : "/login"), text: userLogin },
            { path: "/*", text: "Search" }
        ]
       // return paths;
    }

    return (
        <nav className="navbar" style={{ backgroundColor: "black" }} aria-label="navigation">
            <a href="/" className="logo">
                <img src="/img/logo.png" className="img-responsive ml-3 p-2" alt="MusicRoom logo" width="60" height="60" />
            </a>
            <div className="d-md-none">
                <HamBurgerNav paths={paths} />
            </div>
            <ul className="d-none d-md-flex nav justify-content-end" aria-label="navigation">
                <li>
                    <a href={userHash ? `/profile/${userHash}` : "/login"} className="nav-item mx-2 mt-2 p-1" style={{ color: "white", textDecoration: "none"}}>{userLogin}</a>
                </li>
                <li>
                    <a href="/search" className="nav-item mx-2 mt-2 p-1" style={{ color: "white", textDecoration: "none"}}>Search</a>
                </li>
                <li>
                    <a href="/about" className="nav-item mx-2 mt-2 p-1" style={{ color: "white", textDecoration: "none"}}>About Us</a>
                </li>
                <li>
                    {path}
                </li>
            </ul>
        </nav>
    )
}

function HamBurgerNav({ paths }) {
    const size = {
        fontSize: "xx-large"
    }
    // paths [{path: path, text: text}]
    const items = paths.map((e) => {
        return (
            <li key={e.text} className="mb-3">
                <Link className="dropdown-item" to={e.path} style={{ color: "white" }}>{e.text}</Link>
            </li>
        )
    })

    return (
        <div className="dropdown">
            <button className="btn border-0 bg-transparent" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                <i style={size} className="bi bi-list text-white"></i>
            </button>
            <ul style={{ backgroundColor: "black" }} className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                {items}
            </ul>
        </div>
    )
}

export default NavBar;