## Purpose

The purpose of this program, is to bring together a live chat application built using `react` for the surfer community. One of the most difficult tasks as a surfer is figuring out if the conditions are ideal for surfing, due to the amount of variables that effect the waves. Certain outlying varibales like depth of sea floor, sand bars, current direction, and crowdes, make it very difficult to predict if the conditions are ideal. This application allows surfers to see some basic information about a beach they are interested in surfing, and can then view a live chat. The live chat allows you to sign in with a temporary user name, and participate in the conversation. This live chat feature makes the application ideal for sharing information about how the conditions were at a specific beach that day. 

## Usage Developer Mode: Webpack

To use the program clone the repository.

Using Node.js run `npm install` to install all of the dependencies

Then use `npm start`

This will concurrently run `server.js` on localhost:3000 and the webpack developer build for the client on localhost:5000.

The `webpack.config.js` file contains a proxy so all requests to the server are routed to localhost:3000.

This makes it easy to go from running on the development webpack to the actual production build, so there is no need for code changes.

## Usage Production Mode: Build

Use `npm install` to download all of the dependencies

To use the production version of the program first make sure the dist folder contains `index.html` and `bundle.js`. 

If this folder does not exist, or modifications were made to the program were made that you want to test, run `npm run build` and the webpack will compile the build and output/update `index.html` and `bundle.js` into the dist folder. 

Then simply run `npm run server` and the dist files will be served by express on localhost:3000. Both the API, and the Client in this case will be running on localhost:3000. 

## `server.js`

This is the server of the program.

The server of the program serves the static files from the dist folder if they exist.

It also uses `express-session` middlewear for storing cookies on the client. This makes it so a user name can only be chosen on a browser once until the cookie is destroyed, or the server is restarted. 

The server is also responsible for API calls to caching with Redis.

The Redis cache and session cookie are both cleared when the server is started up. 

The server also contains all of the socket connections for each of the beaches that are supported.

### Redis

Redis in this case caches a few different things. One of which is the temporary user name that is chosen for the live chat, so that no duplicates can occur. 

Redis also caches an array for each of the beaches that are supported. The array stores references to a unique date time. Redis additionally stores these unique date times as key value pairs in the cache. Where the key is the datetime and the value is a JSON object containing a time stamp, message, and username that posted it.

The purpose of the above functionality is to populate the beach selected with all of the messages that have taken place. Essentially the history of messages currently up to 10 defined by `numMessages` in `server.js`.

### Sockets

The sockets in the server are responsible for all of the chat functionality. A socket connection is created for each of the individual beaches that are supported by the program.

When a user submits a message on the client, the server side socket connection receives the message, and then broadcasts it back and updates the state in the `Chat.js` component of react. The chat for each connection listening then updates with the message.

