import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import axios from '../../axios'
import './Register.css'

const Register = () => {

    let history = useHistory()
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('/api/users/register',{
            name: name,
            username: username,
            email: email,
            password: password
        })
        .then(response => console.log(response))
        .catch(err => {
            setErrors(err.response.data.error)
        })
    }
    return (
        <div className="Register">
            <div className="Register__main">
                <h2>Create an account</h2>
                <div className="Register__form">
                    <form noValidate onSubmit={handleSubmit}>
                        <label className={errors.name ? "label_error" : "label"}>Name{errors.name ? ` - ${errors.name}` : ''}</label><br />
                        <input className={errors.name ? "input_error" : "input"} type="text" onChange={({ target }) => setName(target.value)} /><br />
                        <label className={errors.username ? "label_error" : "label"}>Username{errors.username ? ` - ${errors.username}` : ''}</label><br />
                        <input className={errors.username ? "input_error" : "input"} type="text" onChange={({ target }) => setUsername(target.value)} /><br />
                        <label className={errors.email ? "label_error" : "label"}>Email{errors.email ? ` - ${errors.email}` : ''}</label><br />
                        <input className={errors.email ? "input_error" : "input"} type="email" onChange={({ target }) => setEmail(target.value)} /><br />
                        <label className={errors.password ? "label_error" : "label"}>Password{errors.password ? ` - ${errors.password}` : ''}</label><br />
                        <input className={errors.password ? "input_error" : "input"} type="password" onChange={({ target }) => setPassword(target.value)} /><br />
                        <button>Register</button>
                    </form>
                    <a href="../Login/Login.js">Already have an account?</a>
                </div>
            </div>
        </div>
    )
}

export default Register