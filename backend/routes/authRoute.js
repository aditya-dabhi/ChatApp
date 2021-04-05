const router = require('express').Router()
const user = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const loginValidation = require('../validation/loginValidation')
const signupValidation = require('../validation/signupValidation')

router.get('/',(req,res) => {
    res.status(200).json({msg:"Hello from authRoute"})
})

router.post('/register', async(req,res) => {
    const {errors, isValid} = signupValidation(req.body)

    if(!isValid) {
        return res.status(400).json({error: errors})
    }
    
    const username_exists = await user.findOne({username: req.body.username})
    if(username_exists) {
        errors.username = "Username already exists"
        return res.status(400).json({error: errors})
    }

    const email_exists = await user.findOne({email: req.body.email})
    if(email_exists) {
        errors.email = "Email already exists"
        return res.status(400).json({error: errors})
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password,salt)

    const newUser = new user({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hashPassword
    })
    try {
        const savedUser = await newUser.save()
        res.status(201).json({newUser:newUser._id})
    } catch(err) {
        res.status(400).json({error:err})
    }
})

router.post('/login', async (req,res) => {
    const {errors, isValid} = loginValidation(req.body)  
    if(!isValid) {
        return res.status(400).json({error:errors})
    }

    const user_exists = await user.findOne({email: req.body.email})
    if(!user_exists) {
        errors.email = "User not found"
        return res.status(400).json({error: errors})
    }

    const validPass = await bcrypt.compare(req.body.password,user_exists.password)
    if(!validPass){
        errors.password = "Password is incorrect"
        return res.status(400).json({error: errors})
    }
    const tokenID = jwt.sign({_id:user._id,name:user.name}, process.env.TOKEN_SECRET)
    const token = JSON.stringify({tokenID:tokenID, id:user_exists._id, username:user_exists.username})
    res.header('auth-token',tokenID).send(token)
})


module.exports = router