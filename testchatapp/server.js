const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3000;


io.on("connection", socket => {
    console.log("a user connected");
    // socket.on('disconnect', () => {
    //     console.log('user disconnected');
    //     delete gameState.players[socket.id]
    // });
    socket.on('newPlayer', (data) => {
       console.log(data)
        if (data.playerID > 0) {
            if(data.pin === '123456'){
                io.emit("StartGame", data.playerID)
            } else {
                io.emit("WrongPin")
            }
        } else {
            io.emit("SelectPlayer")
        }
    })
    socket.on('navigateAll', () => {
        io.emit("navigateClient")
    })

    socket.on("MoveToServer",(data1) => {
        console.log("MoveToServer")
        io.emit("MoveToClient",data1)
    })
    socket.on("Fire",(data1) => {
        io.emit("FireClient",data1)
    })
});



server.listen(port, () => console.log("server running on port :" + port));
