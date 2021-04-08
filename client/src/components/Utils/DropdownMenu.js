import React, {useState, useEffect} from 'react'
import './DropdownMenu.css'
import {Avatar} from '@material-ui/core'
import axios from '../../axios'

const DropDownItem = props => {
    const handleConfirm = event => {
        event.preventDefault()
        axios.post('/api/users/notification/confirm',{
            member1: props.currentUser,
            member2: props.reqUser
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
        alert("Request Confirmed")
        props.changeShow()
    }
    const handleDelete = event => {
        event.preventDefault()
        console.log("Delete Clicked")
        const deleteNotify = async () => {
            const delNotify = await axios.post('/api/users/notification/delete',{
                member1: props.currentUser,
                member2: props.reqUser
            })
            .then(res => console.log(res))
            .catch(err => console.log(err))
            alert("Request Deleted")
            props.changeShow()
        }
        deleteNotify()
    }
    return (
        <div className="dropdown-item">
            <Avatar />
            <div className="dropdown-item-info">
                <p><b>{props.username}</b> sent you a friend request.</p>
                <div className="dropdown-item-btngrp">
                    <button className="btn-confirm" onClick={handleConfirm}>Confirm</button>
                    <button className="btn-delete" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    )
}

const DropdownMenu = props => {
    const [reqNotify, setReqNotify] = useState([])
    //const [refreshData, setRefreshData] = useState(props.show)
    useEffect(() => {
        const fetchData = async () => {
            const axiosFetch = await axios.get(`/api/users/user/${props.currentUser}`)
                .then(fetchUser => {
                    console.log("Inside Use Effect")
                    setReqNotify(fetchUser.data.user.request_notification)
                })
                .catch(err => console.log(err))
        }
        fetchData()
    },[props.show])
    //console.log("Refresh Data", refreshData)
    if(!props.show){
        return null
    }
    if(reqNotify.length === 0) return null
    return (
        <div className="dropdown">
            {console.log("Inside Return")}
            {reqNotify.map((notify) => {
                return <DropDownItem 
                        username={notify.username} 
                        currentUser={props.currentUser} 
                        reqUser={notify._id} 
                        changeShow = {props.changeShow}
                        />
            })}
        </div>
    )
}

export default DropdownMenu