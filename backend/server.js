const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const app = express()
port = process.env.PORT || 8000

app.use(express.json())
app.use(cors())

app.get('/',(req,res) => {
    res.status(200).json({msg:"Hello World"})
})

app.listen(port,()=>console.log(`Server running on the port ${port}`))