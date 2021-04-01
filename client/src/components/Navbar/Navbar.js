import React from 'react'
import './Navbar.css'

const Navbar = () => {
    return (
        <div className="Navbar">
            <div className="Navbar__Title">
                <h1>Chatter</h1>
            </div>
            <div className="Navbar__Buttongrp">
                <button className="Navbar__Button">Login</button>
                <button className="Navbar__Button">Register</button>
            </div>
        </div>
    )
}

export default Navbar