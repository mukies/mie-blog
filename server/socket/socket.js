const express = require("express");
const app = express();
const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

const getReceiverSocketID = (id) => socketMap[id];

const socketMap = {};

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  const { userID } = socket.handshake.query;
  if (userID) {
    socketMap[userID] = socket.id;
  }
  socket.on("isTyping", (isTyping) => {
    const receiverID = socketMap[isTyping.id];
    if (receiverID) {
      socket
        .to(receiverID)
        .emit("isTyping", { id: isTyping.senderID, typing: isTyping.typing }); // Broadcast typing status to other clients
    }
  });

  io.emit("onlineUsers", Object.keys(socketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete socketMap[userID];
    io.emit("onlineUsers", Object.keys(socketMap));
  });
});

module.exports = { app, server, io, getReceiverSocketID };
