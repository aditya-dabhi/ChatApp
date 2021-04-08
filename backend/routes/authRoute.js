const router = require('express').Router()
const mongoose = require('mongoose')
const user = require('../models/User')
const Conversation = require('../models/Conversation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const loginValidation = require('../validation/loginValidation')
const signupValidation = require('../validation/signupValidation')


router.get('/',(req,res) => {
    res.status(200).json({msg:"Hello from authRoute"})
})

router.get('/user/:id', (req,res)=> {
    user.findById(req.params.id)
    .populate('request_notification')
    .then(async (response) => await res.json({user: response}))
    .catch(err => res.json({error: err}))
})

router.post('/friend_request/:id',(req,res) => {
    user.findOne({username: req.body.username})
    .then(async(response) => {
        if(response === null) {
            return res.status(400).json({error: "No such user exists"})
        }
        let req_notify = response.request_notification
        for(let i=0; i<req_notify.length; i++) {
            const notify = mongoose.Types.ObjectId(req_notify[i])
            req.params.id = mongoose.Types.ObjectId(req.params.id)
            if(notify.equals(req.params.id)){
                return res.status(400).json({error: "You already sent a friend request."})
            }         
        }
        req_notify.unshift(req.params.id)
        response.request_notification = req_notify
        const updatedUser = await response.save()
        return res.json({updatedUser: updatedUser, msg:" Friend request sent"})
    })
    .catch(err => res.status(400).json({error: err}))
})

router.get('/notification/:id',(req,res) => {
    user.findById(req.params.id)
    .populate('request_notification')
    .then((response) => {
        return res.json({notification: response.request_notification})
    })
    .catch(error => res.status(400).json({error:error}))
})

router.post('/notification/confirm',async (req,res) => {
    const newConversation = new Conversation({
        members : [req.body.member1, req.body.member2]
    })
    const savedConversation = await newConversation.save()
    user.findById(req.body.member1)
    .then((response) => {
        const mem1_request_notification = response.request_notification
        mem1_request_notification.splice(mem1_request_notification.indexOf(req.body.member2),1)
        response.request_notification = mem1_request_notification
        response.conversations.unshift(newConversation._id)
        const savedUser1 = response.save()
    })
    .catch(err => res.status(400).send(err))
    user.findById(req.body.member2)
    .then((response) => {
        response.conversations.unshift(newConversation._id)
        const savedUser2 = response.save()
    })
    .catch(err => res.status(400).send(err))
    return res.status(200).json({
        msg:"Conversation created",
        newConversation: newConversation
    })
})

router.post('/notification/delete',(req,res) => {
    user.findById(req.body.member1)
    .then(async (response) => {
        const mem1_request_notification = response.request_notification
        mem1_request_notification.splice(mem1_request_notification.indexOf(req.body.member2),1)
        response.request_notification = mem1_request_notification
        const savedUser1 = await response.save()
    })
    .catch(err => res.status(400).json({error:err}))
    return res.status(200).json({msg:"Request deleted"})
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