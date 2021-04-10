import React from 'react'
import { useHistory } from 'react-router-dom'
import SendIcon from '@material-ui/icons/Send';
import './Chat.css'
import { io } from "socket.io-client"
const socket = io("http://localhost:8000", { transports: ['websocket', 'polling', 'flashsocket'] });


// client-side
socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on("disconnect", () => {
    console.log(socket.id); // undefined
});




const Chat = () => {
    let history = useHistory()
    const auth = localStorage.getItem('token') ? true : false
    let msg = "";

    const btnClickHandler = () => {
        console.log("Sending!");
        socket.emit("hello", msg);
    }

    const onChangeHandler = e => {
        msg = e.target.value;
    }
    if (!auth) history.push('/login')
    return (
        <div className="Chat">
            <div className="Chat__Header">
                <h2>Name</h2>
            </div>
            <div className="Chat__Body"></div>
            <div className="Chat__Footer">
                <input onChange={onChangeHandler} type="text" placeholder="Type your message here" />
                <button onClick={btnClickHandler}><SendIcon /></button>
            </div>
        </div>
    )
}

export default Chat