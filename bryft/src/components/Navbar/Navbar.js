import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">BRYFT</Link>
            </div>
                <ul className="navbar-links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/rides">Rides</Link>
                    </li>
                    <li>
                        <Link to="/user-profile">Profile</Link>
                    </li>
                </ul>
        </nav>
    )
}

export default Navbar;