const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const server = express();
server.use(bodyParser.json());
server.use(cors());

server.use(express.static('front-end'));

server.use(express.static('front-end/about'));
server.use(express.static('front-end/favorites'));
server.use(express.static('front-end/resources'));
server.use(express.static('front-end/search'));
server.use(express.static('front-end/index'));


server.listen(process.env.PORT || 3000);
//route to get all user beer favorites
server.get("/", (req, res) => {
    res.sendFile(__dirname + "/front-end/index/index.html");
});