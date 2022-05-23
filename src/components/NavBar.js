import Dropdown from 'react-bootstrap/Dropdown';
import React from "react";
import { NavLink, Link } from "react-router-dom";
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

export function NavBar(props) {
    const paths = [{path: '/search', text:"Search"}]
    return (
        <nav className="navbar bg-primary">
            <a className="logo" href="#"><img src="img/logo.png" className="img-responsive ml-3 p-2" alt="MusicRoom logo" width="60"
                height="60" />
            </a>
            {/* <i className="bi bi-list px-3 d-md-none"></i> */}
            <div className='d-md-none'>
                <NavHamburgerList paths={paths}/>
            </div>
            <ul className="d-none d-md-flex nav justify-content-end" aria-label="navigation">
                {/* <li className="nav-item mx-2 mt-2 p-1">
                    <a className="navLink text-decoration-none text-white" href="landingpage.html#about">About Us</a>
                </li> */}
                {/* <li className="nav-item mx-2 mt-2 p-1">
                    <a className="navLink text-decoration-none text-white" href="features.html">Features</a>
                </li> */}
                {/* <li className="nav-item mx-2 mt-2 p-1">
                    <a className="navLink text-decoration-none text-white" href="foryoupage.html">For You</a>
                </li> */}
                <li className="nav-item mx-2 mt-2 p-1">
                    <NavItem path='search' text='Search' />
                </li>
                <li className="nav-item mx-2 mt-1 p-1">
                    <SignInButton />
                </li>
            </ul>
        </nav>
    )
}

function SignInButton(prop) {
    return (
        <Link to={'/login'} className="text-decoration-none text-white"><button className="btn btn-light">Sign In</button></Link>
    )
}

function NavItem({ path, text }) {
    return (
        <NavLink to={path} className="text-decoration-none text-white">{text}</NavLink>
    )
}

function NavHamburgerList(props) {
    // [{path: 'path', text='text'}]
    const items = props.paths.map((item) => {
        return (
            <DropdownItem key={item.path} as={NavLink} to={item.path}>{item.text}</DropdownItem>
        )
    })
    return (
        <div>
            <Dropdown>
                <DropdownToggle>
                    <i className="bi bi-list px-3 "></i>
                </DropdownToggle>
                <Dropdown.Menu>
                    {items}
                    <DropdownItem as={SignInButton}>Sign In</DropdownItem>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}