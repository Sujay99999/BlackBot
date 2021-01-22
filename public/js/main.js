//This is the client side of the project, operating from the server

//This io function is present as we loaded the socket script in the chat.html file
//This function is only available, when the client also operates from the same domain
//The socket is the particular user that is connected to the server
const socket = io();

//Sending a message to all the connected sockets
const chatForm = document.getElementById("chat-form");
chatForm.addEventListener("submit", (event) => {
  //we are extracting the value of the input at the form
  event.preventDefault();
  const messageAtChatBox = event.target.elements.msg.value;

  //We need to emit this message back to the client, so that, it braodcasts
  //the messgae to all the connected sockets
  socket.emit("messageClient", messageAtChatBox);
});

//There are some events fired off from the server, which we need to catch at the client
//We need to add the event lsitener using socket.on
//This eventlistner listens to all messages of the name "message"
socket.on("message", (message) => {
  console.log(`${message}`);
});
