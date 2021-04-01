const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
port = process.env.PORT || 8000

app.use(express.json())
app.use(cors())

const connection_url = "mongodb+srv://adityadabhi:adityadabhi@cluster0.gh56r.mongodb.net/chatapp?retryWrites=true&w=majority"
mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
},()=>console.log('Mongoose connected'))

io.on('connection', (socket) => {
    console.log(`User ${socket.id} is connected`)
    socket.on('disconnect',() => {
        console.log(`User is disconnected`)
    })
})

app.get('/',(req,res) => {
    res.status(200).json({msg:"Hello World"})
})

server.listen(port,()=>console.log(`Server running on the port ${port}`))