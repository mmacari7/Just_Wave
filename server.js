// Sets up our express server
const express = require("express");
const path = require('path');
const bluebird = require('bluebird');
const redis = require('redis');
//const { sendMessage } = require('./redis/nrp-sender-shim');
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const session = require('express-session');

// How many messages to load from Redis and send to client
const numMessages = 10;

bluebird.promisifyAll(redis);

// Start Redis
const client = redis.createClient();

// FLUSHES CLIENT ON SERVER SPIN UP
client.flushallAsync();

// Serves our build from webpack --> production
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("dist"));
app.use('/assets', express.static("assets"));

// Set a cookie for tracking user names
app.use(session({
    name: "UserList",
    secret: "I am batman",
    resave: false,
    saveUninitialized: true
}))

// Get the base route
app.get('/api/getMe', async (req, res) => {
    console.log(req.query);

    console.log("Doing nothing");
    res.json({data: "Hello World"});
})

// Handle Temp User Name Submission
app.get('/api/get-username', async (req, res)=>{
    if(req.session.username){
        res.json({username: req.session.username});
        return;
    }
    else {
        res.json({username: false});
        return;
    }
})

// Set the user name after it is input
app.post('/api/set-username', async (req, res)=> {
    // Sets our cookie
    req.session.username = req.body.username;

    res.json({message: "Set user name to: " + req.body.username});

})

// Create routes for each beach that we want to cache in Redis
// Get from redis cache for beach
app.get('/api/get-conversation', async (req, res)=> {
    // Get beach key from params
    let beachKey = (req.query.key);
    let messageList;
    try {
        // Gets the last numMessages to load from the cache
        messageList = await client.lrangeAsync(beachKey, 0, numMessages);
    }
    catch(e) {
        res.send({status: e.message});
        return;
    }

    // Creates a new array so we can grab the messages and send them to the client
    let messagesForClient = [];
    for(let i=0; i < messageList.length; i++) {
        let messageKey = beachKey + ":" + messageList[i];
        let res = await client.getAsync(messageKey);
        res = JSON.parse(res);
        messagesForClient.push(res);
    }
    
    res.json({messagesForClient});

})

// Serve index to all routes for build
app.get('*', async (req, res)=> {
    res.sendFile('index.html', {root: path.join(__dirname, 'dist')})
})


// Defines our socket connections
const seabright = io.of("/seabright");
const pipline = io.of("/pipeline");
const newport = io.of("/newport");
const laguana = io.of("/laguana");
const oceancity = io.of("/oceancity");

// Seabright beach socket connection
seabright.on("connection", async (socket) => {
    console.log("Someone connected to seabright socket");

    let beachKey = "seabright";

    socket.on('server-message', async (obj)=> {
        // Object params
        let username = obj.username;
        let message = obj.message;
        let datetime = obj.datetime;

        // Define message key for message entry to be unique datetime for seabright
        let messagekey = beachKey + ':' + datetime;

        // Store the message object into Redis list with Key based on datetime
        try {
            await client.rpushAsync(beachKey, datetime);
            await client.ltrimAsync(beachKey, (0-numMessages), -1);
        }
        catch(e){
            console.log(e);
        }
        // Set message in redis cache
        try {
            await client.setAsync(messagekey, JSON.stringify({datetime, username, message}));
        }
        catch(e){
            console.log(e);
        }

        socket.broadcast.emit('client-message', {datetime, username, message});

    })

})

pipline.on("connection", async (socket)=> {
    console.log("Someone connected to pipeline socket");

    let beachKey = "pipeline";

    socket.on('server-message', async (obj)=> {
        // Object params
        let username = obj.username;
        let message = obj.message;
        let datetime = obj.datetime;

        // Define message key for message entry to be unique datetime for seabright
        let messagekey = beachKey + ':' + datetime;

        // Store the message object into Redis list with Key based on datetime
        try {
            await client.rpushAsync(beachKey, datetime);
            await client.ltrimAsync(beachKey, (0-numMessages), -1);
        }
        catch(e){
            console.log(e);
        }
        // Set message in redis cache
        try {
            await client.setAsync(messagekey, JSON.stringify({datetime, username, message}));
        }
        catch(e){
            console.log(e);
        }

        socket.broadcast.emit('client-message', {datetime, username, message});

    })

})

newport.on("connection", async (socket)=> {
    console.log("Someone connected to newport socket");

    let beachKey = "newport";

    socket.on('server-message', async (obj)=> {
        // Object params
        let username = obj.username;
        let message = obj.message;
        let datetime = obj.datetime;

        // Define message key for message entry to be unique datetime for seabright
        let messagekey = beachKey + ':' + datetime;

        // Store the message object into Redis list with Key based on datetime
        try {
            await client.rpushAsync(beachKey, datetime);
            await client.ltrimAsync(beachKey, (0-numMessages), -1);
        }
        catch(e){
            console.log(e);
        }
        // Set message in redis cache
        try {
            await client.setAsync(messagekey, JSON.stringify({datetime, username, message}));
        }
        catch(e){
            console.log(e);
        }

        socket.broadcast.emit('client-message', {datetime, username, message});

    })

})

laguana.on("connection", async (socket)=> {
    console.log("Someone connected to laguana socket");

    let beachKey = "laguana";

    socket.on('server-message', async (obj)=> {
        // Object params
        let username = obj.username;
        let message = obj.message;
        let datetime = obj.datetime;

        // Define message key for message entry to be unique datetime for seabright
        let messagekey = beachKey + ':' + datetime;

        // Store the message object into Redis list with Key based on datetime
        try {
            await client.rpushAsync(beachKey, datetime);
            await client.ltrimAsync(beachKey, (0-numMessages), -1);
        }
        catch(e){
            console.log(e);
        }
        // Set message in redis cache
        try {
            await client.setAsync(messagekey, JSON.stringify({datetime, username, message}));
        }
        catch(e){
            console.log(e);
        }

        socket.broadcast.emit('client-message', {datetime, username, message});

    })

})

oceancity.on("connection", async (socket)=> {
    console.log("Someone connected to ocean city socket");

    let beachKey = "oceancity";

    socket.on('server-message', async (obj)=> {
        // Object params
        let username = obj.username;
        let message = obj.message;
        let datetime = obj.datetime;

        // Define message key for message entry to be unique datetime for seabright
        let messagekey = beachKey + ':' + datetime;

        // Store the message object into Redis list with Key based on datetime
        try {
            await client.rpushAsync(beachKey, datetime);
            await client.ltrimAsync(beachKey, (0-numMessages), -1);
        }
        catch(e){
            console.log(e);
        }
        // Set message in redis cache
        try {
            await client.setAsync(messagekey, JSON.stringify({datetime, username, message}));
        }
        catch(e){
            console.log(e);
        }

        socket.broadcast.emit('client-message', {datetime, username, message});

    })

})

// Sets up our server on localhost 3000
http.listen(3000, () => {
    console.log("Server started, listening on port 3000");
});
