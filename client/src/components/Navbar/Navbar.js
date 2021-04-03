import React from 'react'
import {useHistory} from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    let history = useHistory()
    const handleLogout = event => {
        event.preventDefault()
        localStorage.removeItem('token')
        history.push('/')
    }
    return (
        <div className="Navbar">
            <div className="Navbar__Title">
                <h1>Chatter</h1>
            </div>
            <div className="Navbar__Buttongrp">
                <button className="Navbar__Button" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar