// Starts our server
const express = require("express");
const app = express();

// Serves our build from webpack --> production
app.use(express.static("dist"));

// Get the base route
app.get('/getMe', (req, res) => {
    console.log("Doing nothing");
    res.json({message: "Hello World"});
})


app.listen(3000, () => {
    console.log("Server started, listening on port 3000");
});

// Random comment
