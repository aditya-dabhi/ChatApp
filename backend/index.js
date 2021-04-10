const mongoose = require('mongoose')
const dotenv = require('dotenv')
const server = require("./socket");
dotenv.config();

const connection_url = "mongodb://localhost/chatappdb"
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => console.log('Mongoose connected'))

const port = process.env.PORT || 8000
server.listen(port, () => console.log(`Server running on the port ${port}`))
