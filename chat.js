const express = require('express');
const path = require('path');
const { sendMessage } = require('/redis/nrp-sender-shim');
const app = express();

// Just serve static files
app.use(express.static(path.join(__dirname + '/static/')));

const server = app.listen(3000, () =>
    console.log("We've now got a server! Your routes will be running on http://localhost:3000")
);

const io = require('socket.io')(server);

const getUsers = () => {
   const { connected } = io.sockets;
   return Object.keys(connected).map(user => connected[user].username);
};

io.sockets.on('connect', socket => {
   console.log(`Client with id ${socket.id} has connected.`);

   socket.on('search', async data => {
      console.log('Received message "', data.message, '" from', socket.id);
      try {
         if (!socket.username) {
            // Check to make sure that the username isn't already in use.
            if (getUsers().indexOf(data.username) !== -1) {
               throw `The username '${data.username}' is already taken!`;
            }
            // Add the username to the current socket.
            socket.username = data.username;
            socket.emit('valid');
            console.log(`Assigned ${data.username} to socket id ${socket.id}`);
         }

         const dataToBePosted = {
            user: socket.username,
            message: data.message
         };

         socket.broadcast.emit('receive', dataToBePosted);
         socket.emit('receive', dataToBePosted);
      } 
      catch (e) {
         socket.emit('failed', e);
         console.error('There was an error posting the data.', e);
      }
   });

   socket.on('disconnect', () => {
      console.log(`Client with id ${socket.id} has disconnected.`);
   });
});