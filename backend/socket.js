const app = require("./server");

// TODO: Write all ur socket events here. You can import code from other files using require too

const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})


io.on("connection", socket => {
  console.log("Connected!", socket.id);

  socket.on("hello", msg => {
    console.log(msg);
  });
});

module.exports = server;