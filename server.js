// Ssets up our express server
const express = require("express");
const path = require('path');
//const { sendMessage } = require('./redis/nrp-sender-shim');
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Serves our build from webpack --> production
app.use(express.static("dist"));

// Get the base route
app.get('/api/getMe', (req, res) => {
    console.log("Doing nothing");
    res.json({data: "Hello World"});
})

// Defines our socket connections
// NOTE!!!!::::: COULD CAUSE ISSUES WHEN EXPRESS IS ON LOCALHOST 3000
const seabright = io.of("/seabright");
const pipline = io.of("/pipeline");
const newport = io.of("/newport");
const laguana = io.of("/laguana");
const oceancity = io.of("/oceancity")

// Seabright beach socket connection
seabright.on("connection", (socket) => {
    console.log("Someone connected to seabright socket");

    socket.on('server-message', (obj)=> {
        console.log("Received message from client");

        let username = obj.username;
        let message = obj.message;
        let fromClient = true;

        console.log(username);
        console.log(message);

        socket.broadcast.emit('client-message', {fromClient, username, message});

    })

})

pipline.on("connection", (socket)=> {
    console.log("Someone connected to pipeline socket");

    socket.on('server-message', (obj)=> {
        console.log("Received message from client");

        let username = obj.username;
        let message = obj.message;

        console.log(username);
        console.log(message);

        socket.broadcast.emit('client-message', {username, message});

    })

})

newport.on("connection", (socket)=> {
    console.log("Someone connected to newport socket");

    socket.on('server-message', (obj)=> {
        console.log("Received message from client");

        let username = obj.username;
        let message = obj.message;

        console.log(username);
        console.log(message);

        socket.broadcast.emit('client-message', {username, message});

    })

})

laguana.on("connection", (socket)=> {
    console.log("Someone connected to laguana socket");

    socket.on('server-message', (obj)=> {
        console.log("Received message from client");

        let username = obj.username;
        let message = obj.message;

        console.log(username);
        console.log(message);

        socket.broadcast.emit('client-message', {username, message});

    })

})

oceancity.on("connection", (socket)=> {
    console.log("Someone connected to ocean city socket");

    socket.on('server-message', (obj)=> {
        console.log("Received message from client");

        let username = obj.username;
        let message = obj.message;

        console.log(username);
        console.log(message);

        socket.broadcast.emit('client-message', {username, message});

    })

})

// Sets up our server on localhost 3000
http.listen(3000, () => {
    console.log("Server started, listening on port 3000");
});
