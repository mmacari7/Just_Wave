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

io.on("connection", (socket) => {
    console.log("Someone connected");
})


http.listen(3000, () => {
    console.log("Server started, listening on port 3000");
});


// Random comment
