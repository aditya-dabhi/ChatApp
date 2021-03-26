import React from 'react'
import './Body.css';
import Sidebar from '../Sidebar/Sidebar';
import Chat from '../Chat/Chat';

const Body = () => {
    return (
        <div className="Body">
            <div className="Body__Sidebar">
                <Sidebar />
            </div>
            <div className="Body__Chat">
                <Chat />
            </div>
        </div>
    )
}

export default Body