const express = require("express");
const socketIO = require("socket.io");

const router = express.Router();
const server = require("http").createServer(router);
const io = socketIO(server, {
    cors: {
        origin: ["http://localhost:5173"]
    }
});

io.on("connection", (socket) => {
    console.log(`Socket Connected ${socket.id}`);
});

server.listen(3001, () => {
    console.log("Socket server connected");
});

module.exports = router;