// TODO: Write only express config here

const express = require('express')
const cors = require('cors')

const authRoute = require('./routes/authRoute')

const app = express()

app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.status(200).json({ msg: "Hello World" })
})

app.use('/api/users', authRoute)

module.exports = app;