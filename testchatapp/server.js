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
    socket.on('newPlayer', (data) => {
       console.log(data)
        if (data.playerID > 0) {
            if(data.pin === '123456'){
                gameState.players[data.playerID] = {
                    playerID: data.playerID,
                    x: 250,
                    y: 250
                }

                io.emit("StartGame", gameState.players[data.playerID])
            } else {
                io.emit("WrongPin")
            }
        } else {
            io.emit("SelectPlayer")
        }
        io.emit("PlayGame")
    })

    if(gameState.players.length === 2) {
        io.emit("Game Begin")
        //start timer on it
    }
});



server.listen(port, () => console.log("server running on port :" + port));
