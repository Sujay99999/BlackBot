//This is the kickoff page of the serverside

//Internal Modules
const http = require("http");

//NPM Modules
const dotenv = require("dotenv");
const socketio = require("socket.io");

//Connecting the .env files gloabally
dotenv.config({
  path: `./config.env`,
});

process.on("uncaughtException", (err) => {
  console.log("Shutting down the app and server");
  console.log(err.name, err.message);
  console.log(err);
  process.exit(1);
});

//Requiring the app.js file
const app = require("./app");

//This server creation is actually not needed, but then to get the server variable, we use this method
//to get the server variable to initaite the socket.io connection
const server = http.createServer(app);

//Initializing the io connection
const io = socketio(server);

//Setting up the connection
//The event 'connection' is fired up, when the client gets connected to the server that is
//listening at port3000
io.on("connection", (socket) => {
  //The socket paramter contains the information about the different users connected to the client
  console.log("A new connection to the server is established");
  console.log(socket.id);

  //socket.emit is a function that is fired, when we are sending an event to the
  //particular client, that is connected
  socket.emit("message", `Welcome to the BlackBot ${socket.id}`);

  //socket.broadcast.emit is a function that is used to send the message to all other sockets other
  //than the connected socket
  socket.broadcast.emit(
    "message",
    `A new user ${socket.id} has joined the chat`
  );

  //io.emit is a function that fires off the message to all connected sockets, including the
  //recently connected socket
  socket.on("disconnect", () => {
    io.emit("message", `The user ${socket.id} has left the chat`);
  });

  //Listening to the messages sent by client to the server and emitting it to all the sockets
  socket.on("messageClient", (msg) => {
    io.emit("message", msg);
  });
});

const port = process.env.PORT || 3000;
//we need to listen to the explicitly created server that is created using the app object
const serverListen = server.listen(port, () => {
  console.log(`The server is listening to requests on port ${port}`);
});

//Handling the unHnadled promises
process.on("unhandledRejection", (err) => {
  //we need to shut down the server gracefully and exit the process
  console.log("Shutting down the server");
  console.log(err.name, err.message);
  console.log(err);
  serverListen.close(() => {
    console.log("Shutting down the app");
    process.exit(1);
  });
});
