const express = require('express');
const app = express();
const path = require("path");

app.use(express.static('public'));

app.get("/", (req, res) => {
    console.log("Here");
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000)