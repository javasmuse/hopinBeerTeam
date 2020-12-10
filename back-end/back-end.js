const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const server = express();

server.use(bodyParser.json());
server.use(cors());

server.listen(process.env.PORT || 3000);

var favorites = [];

//route to return list of all employees
server.get("/favorites", (req, res) => {
    res.send("hi");
});