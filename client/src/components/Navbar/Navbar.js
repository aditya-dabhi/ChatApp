import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add';
import NotificationsIcon from '@material-ui/icons/Notifications';
import './Navbar.css'
import { IconButton } from '@material-ui/core';
import Modal from '../Utils/Modal';
import DropdownMenu from '../Utils/DropdownMenu';

const Navbar = () => {
    const [showModal, setShowModal] = useState(false)
    const [showNotification, setShowNotification] = useState(false)
    const [addFriend, setAddFriend] = useState('')
    const auth = JSON.parse(localStorage.getItem('token'))
    let history = useHistory()
    const handleLogout = event => {
        event.preventDefault()
        localStorage.removeItem('token')
        history.push('/')
    }

    const handleAddFriend = (event) => {
        event.preventDefault()
        console.log(addFriend)
    }

    return (
        <div className="Navbar">
            <div className="Navbar__Title">
                <h1>Chatter</h1>
            </div>
            <div className="Navbar__Buttongrp">
                <IconButton onClick={() => setShowNotification(!showNotification)}>
                    <NotificationsIcon style={{ color: "white" }} />
                </IconButton>
                <IconButton onClick={() => setShowModal(true)} color="inherit">
                    <AddIcon color="inherit" />
                </IconButton>
                <p>{auth.username}</p>
                <button className="Navbar__Button" onClick={handleLogout}>Logout</button>
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <form className="Form__AddFriend">
                    <input placeholder="Enter Username" type="text" onChange={({ target }) => setAddFriend(target.value)}/>
                    <button onClick={handleAddFriend}>Send</button>
                </form>
            </Modal>
            <DropdownMenu show={showNotification} />
        </div>
    )
}

export default Navbar