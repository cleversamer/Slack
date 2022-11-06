const socket = io("http://localhost:9000"); // the / namespace (Which is the main namespace)
const socket2 = io("http://localhost:9000/admin"); // the /admin namespace

socket.on("connect", () => {
  console.log("main namespace =>", socket.id);
});

socket2.on("connect", () => {
  console.log("admin namespace =>", socket2.id);
});

socket2.on("welcome", (message) => {
  console.log(message);
});

socket.on("messageFromServer", (message) => {
  console.log(message);
  socket.emit("dataToServer", { data: "Data from the client!" });
});

document.querySelector("#message-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const newMessage = document.querySelector("#user-message").value;
  socket.emit("newMessageToServer", { text: newMessage });
});

socket.on("messageToClients", (message) => {
  document.querySelector("#messages").innerHTML += `<li>${message.text}</li>`;
});
