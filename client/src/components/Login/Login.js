import React, { useState } from 'react'
import './Login.css'
import axios from '../../axios'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('/api/users/login',{
            email: email,
            password: password
        })
        .then(response => {
            console.log(response)
            localStorage.setItem('token',JSON.stringify(response.data))
        })
        .catch(err => setErrors(err.response.data.error))
    }

    return (
        <div className="Login">
            <div className="Login__main">
                <h2>Welcome Back !!</h2>
                <p>We're so excited to see you again!</p>
                <div className="Login__form">
                    <form noValidate onSubmit={handleSubmit}>
                        <label className={errors.email ? "label_error" : "label"}>Email{errors.email ? ` - ${errors.email}` : ''}</label><br />
                        <input className={errors.email ? "input_error" : "input"} type="email" onChange={({ target }) => setEmail(target.value)} /><br />
                        <label className={errors.password ? "label_error" : "label"}>Password{errors.password ? ` - ${errors.password}` : ''}</label><br />
                        <input className={errors.password ? "input_error" : "input"} type="password" onChange={({ target }) => setPassword(target.value)} /><br />
                        <button>Login</button>
                    </form>
                    <a href="../Login/Login.js">Need an account? Register</a>
                </div>
            </div>
        </div>
    )
}

export default Login