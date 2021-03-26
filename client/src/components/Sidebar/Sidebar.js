import React from 'react'
import './Sidebar.css'
import SidebarChat from '../Sidebar/SidebarChat';
import {SearchOutlined} from '@material-ui/icons'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {IconButton} from '@material-ui/core';

const Sidebar = () => {
    return (
        <div className="Sidebar">
            <div className="Sidebar__search">
                <div className="Sidebar__SearchContainer">
                    <SearchOutlined />
                    <input type="text" placeholder="Search" />
                </div>
                <div className="Sidebar__More">
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="Sidebar__Chat">
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    )
}

export default Sidebar