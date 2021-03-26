import './SidebarChat.css'
import React from 'react'
import {Avatar} from '@material-ui/core'

const SidebarChat = () => {
    return (
        <div className="SidebarChat">
            <Avatar />
            <div className="SidebarChat__info">
                <h3>Name</h3>
                <p>Last message</p>
            </div>
        </div>
    )
}

export default SidebarChat