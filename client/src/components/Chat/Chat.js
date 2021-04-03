import React from 'react'
import {useHistory} from 'react-router-dom'
import SendIcon from '@material-ui/icons/Send';
import './Chat.css'

const Chat = () => {
    let history = useHistory()
    const auth = localStorage.getItem('token') ? true : false
    if(!auth) history.push('/login')
    return (
        <div className="Chat">
            <div className="Chat__Header">
                <h2>Name</h2>
            </div>
            <div className="Chat__Body"></div>
            <div className="Chat__Footer">
                <form>
                    <input type="text" placeholder="Type your message here" />
                    <button><SendIcon /></button>
                </form>
            </div>
        </div>
    )
}

export default Chat