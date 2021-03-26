import React from 'react'
import './Chat.css'

const Chat = () => {
    return (
        <div className="Chat">
            <div className="Chat__Header">
                <h2>Name</h2>
            </div>
            <div className="Chat__Body"></div>
            <div className="Chat__Footer">
                <form>
                    <input type="text" placeholder="Type your message here" />
                    <button>Send</button>
                </form>
            </div>
        </div>
    )
}

export default Chat