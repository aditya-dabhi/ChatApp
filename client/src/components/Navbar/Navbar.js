import React, { useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add';
import NotificationsIcon from '@material-ui/icons/Notifications';
import './Navbar.css'
import { IconButton } from '@material-ui/core';
import Modal from '../Utils/Modal';
import DropdownMenu from '../Utils/DropdownMenu';
import axios from '../../axios'

const Navbar = () => {
    const [friendRequest, setFriendRequest] = useState({
        showModal: false,
        sentRequest: false
    })
    const [showNotification, setShowNotification] = useState(false)
    const [addFriend, setAddFriend] = useState('')
    const auth = JSON.parse(localStorage.getItem('token'))
    let history = useHistory()
    const [currentUser, setCurrentUser] = useState('')

    const handleLogout = event => {
        event.preventDefault()
        localStorage.removeItem('token')
        history.push('/')
    }

    const handleAddFriend = (event) => {
        event.preventDefault()
        axios.post(`/api/users/friend_request/${auth.id}`,{
            username: addFriend
        })
        .then(res => {
            setFriendRequest({
                showModal: true,
                sentRequest: true
            })
            console.log("Add Friend",res)
        })
        .catch(error => alert(JSON.stringify(error.response.data.error)))
        console.log(addFriend)
    }

    useEffect(() => {
        axios.get(`/api/users/user/${auth.id}`)
        .then(user => setCurrentUser(user.data.user))
        .catch(err => console.log(err))
    },[])
    return (
        <div className="Navbar">
            <div className="Navbar__Title">
                <h1>Chatter</h1>
            </div>
            <div className="Navbar__Buttongrp">
                <IconButton onClick={() => setShowNotification(!showNotification)}>
                    <NotificationsIcon style={{ color: "white" }} />
                </IconButton>
                <IconButton onClick={() => setFriendRequest({
                    showModal: true,
                    sentRequest: false
                })} color="inherit">
                    <AddIcon color="inherit" />
                </IconButton>
                <p>{currentUser.username}</p>
                <button className="Navbar__Button" onClick={handleLogout}>Logout</button>
            </div>
            <Modal show={friendRequest.showModal} onClose={() => setFriendRequest({showModal: false, sentRequest: false})}>
                {friendRequest.sentRequest && friendRequest.showModal ? <h2 className="ModalRequestSent">Friend Request Sent</h2> : 
                    <form className="Form__AddFriend">
                        <input placeholder="Enter Username" type="text" onChange={({ target }) => setAddFriend(target.value)}/>
                        <button onClick={handleAddFriend}>Send</button>
                    </form>
                }
            </Modal>
            <DropdownMenu show={showNotification} currentUser={currentUser._id} changeShow={()=>setShowNotification(!showNotification)} />
        </div>
    )
}

export default Navbar