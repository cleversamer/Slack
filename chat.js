const express = require("express");
const app = express();
const socketio = require("socket.io");

app.use(express.static(__dirname + "/public"));

// Deciding app port
const PORT = process.env["PORT"] || 9000;

// Listening on decided port
const server = app.listen(PORT, () => {
  console.log(`Express server is listening on port ${PORT}`);
});

// Socket.io options to avoid CORS Policy issues
const options = {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
};

// Socket.io setup
const io = socketio(server, options);

io.on("connection", (socket) => {
  socket.on("newMessageToServer", (message) => {
    // socket.emit => sends data to the connected socket
    // io.emit     => sends data to all the connected sockets
    io.emit("messageToClient", message);
  });
});
