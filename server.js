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

io.on("connection", (socket) => {
    console.log("Someone connected");
})

seabright.on("connection", (socket) => {
    console.log("Someone connected to seabright socket");
})

pipline.on("connection", (scoket)=> {
    console.log("Someone connected to pipeline socket");
})

newport.on("connection", (scoket)=> {
    console.log("Someone connected to newport socket");
})

laguana.on("connection", (scoket)=> {
    console.log("Someone connected to laguana socket");
})

oceancity.on("connection", (scoket)=> {
    console.log("Someone connected to ocean city socket");
})

http.listen(3000, () => {
    console.log("Server started, listening on port 3000");
});


// Random comment
