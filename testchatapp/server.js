const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3000;

const gameState = {
    players:[]
}


io.on("connection", socket => {
    console.log("a user connected");
    socket.on("chat message", msg => {
        console.log(msg);
        io.emit("chat message", msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
        delete gameState.players[socket.id]
    });
    socket.on('newPlayer', () => {
        gameState.players[socket.id] = {
            x: 250,
            y: 250,
            width: 25,
            height: 25
        }
    })
    setInterval(() => {
        io.sockets.emit('state', gameState);
    }, 1000 / 60);
});



server.listen(port, () => console.log("server running on port :" + port));
