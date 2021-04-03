const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/authRoute')

const app = express()
dotenv.config()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
port = process.env.PORT || 8000

app.use(express.json())
app.use(cors())

const connection_url = "mongodb+srv://adityadabhi:adityadabhi@cluster0.duwyn.mongodb.net/chatappdb?retryWrites=true&w=majority"
mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
},()=>console.log('Mongoose connected'))

app.get('/',(req,res) => {
    res.status(200).json({msg:"Hello World"})
})

app.use('/api/users',authRoute)

server.listen(port,()=>console.log(`Server running on the port ${port}`))