import React from 'react'
import './DropdownMenu.css'
import {Avatar} from '@material-ui/core'

const DropDownItem = () => {
    return (
        <div className="dropdown-item">
            <Avatar />
            <div className="dropdown-item-info">
                <p><b>Username</b> sent you a friend request.</p>
                <div className="dropdown-item-btngrp">
                    <button className="btn-confirm">Confirm</button>
                    <button className="btn-delete">Delete</button>
                </div>
            </div>
        </div>
    )
}

const DropdownMenu = props => {
    if(!props.show){
        return null
    }
    return (
        <div className="dropdown">
            <DropDownItem />
            <DropDownItem />
            <DropDownItem />
        </div>
    )
}

export default DropdownMenu