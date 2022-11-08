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

// io.on = io.of("/").on
io.on("connection", (socket) => {
  socket.emit("messageFromServer", "Weclome to the socket.io server!");

  socket.on("messageToServer", (dataFromClient) => {
    console.log(dataFromClient);
  });

  socket.join("room-1");

  socket.to("room-1").emit("joined", `${socket.id} joined room-1!`);
});

io.of("/admin").on("connection", (socket) => {
  console.log("Someone connected to the admin namespace!");

  io.of("/admin").emit("welcome", "Welcome to the admin namespace!");
});
