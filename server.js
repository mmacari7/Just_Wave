// Starts our server
const express = require("express");
const app = express();

// Get the base route
app.get('/', (req, res) => {
    console.log("Doing nothing");
    res.json({message: "Hello World"});
})


app.listen(3001, () => {
    console.log("Server started, listening on port 3001");
});

