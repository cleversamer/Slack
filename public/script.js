const socket = io("http://localhost:9000"); // the / namespace (Which is the main namespace)
const socket2 = io("http://localhost:9000/admin"); // the /admin namespace

socket.on("messageFromServer", (message) => {
  // console.log(message);
  socket.emit("dataToServer", { data: "Data from the client!" });
});

socket.on("joined", (message) => {
  console.log(message);
});

socket2.on("welcome", (dataFromServer) => {
  // console.log(dataFromServer);
});

document.querySelector("#message-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const newMessage = document.querySelector("#user-message").value;
  socket.emit("newMessageToServer", { text: newMessage });
});
