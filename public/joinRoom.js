function joinRoom(roomName) {
  // Send this roomName to the server!
  nsSocket.emit("joinRoom", roomName, (newNumberOfMembers) => {
    // we want to update the room member total now that we have joined!
    const htmlNode = document.querySelector(".curr-room-num-users");
    const value = `${newNumberOfMembers} <span class="glyphicon glyphicon-user"></span>`;
    htmlNode.innerHTML = value;
  });

  nsSocket.on("historyCatchUp", (history) => {
    const messagesUl = document.querySelector("#messages");
    messagesUl.innerHTML = "";

    history.forEach((msg) => {
      const newMsg = buildHTML(msg);
      messagesUl.innerHTML += newMsg;
    });

    messagesUl.scrollTo(0, messagesUl.scrollHeight);
  });

  nsSocket.on("updateMembers", (numMembers) => {
    const htmlNode = document.querySelector(".curr-room-num-users");
    const value = `${numMembers} <span class="glyphicon glyphicon-user"></span>`;
    htmlNode.innerHTML = value;
    document.querySelector(".curr-room-text").innerText = `${roomName}`;
  });

  let searchBox = document.querySelector("#search-box");
  searchBox.addEventListener("input", (e) => {
    let messages = Array.from(document.getElementsByClassName("message-text"));
    messages.forEach((msg) => {
      if (
        msg.innerText.toLowerCase().indexOf(e.target.value.toLowerCase()) === -1
      ) {
        // the msg does not contain the user search term!
        msg.style.display = "none";
      } else {
        msg.style.display = "block";
      }
    });
  });
}
