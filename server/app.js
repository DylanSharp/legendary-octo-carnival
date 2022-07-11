const express = require("express");

const app = express();

require('./connection');

app.get("/", async (req, res) => {
    res.end('Hello');
});

app.listen(3000, () => {
    console.log("Listening...");
});
