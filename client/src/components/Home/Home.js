import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import './Home.css'

const Home = () => {
    let history = useHistory()
    const auth = localStorage.getItem('token') ? true : false
    if(auth) history.push('/chat')
    return (
        <div className="Home">
            <div className="Home__navbar">
                <div className="Navbar__logo">
                    <h1>Chatter</h1>
                </div>
                <div className="Navbar__right">
                    <Link to="/login" className="Navbar__link">
                        Login
                    </Link>
                    <Link to="/register" className="Navbar__link">
                        Register
                    </Link>
                </div>
            </div>
            <div className="Home__body">
                <h1>Your place to talk</h1>
                <p>
                    Whether you’re part of a school club, gaming group, worldwide art community, or just a<br /> 
                    handful of friends that want to spend time together, Chatter makes it easy to talk every day<br /> 
                    and hang out more often.
                </p>
            </div>
        </div>
    )
}

export default Home
