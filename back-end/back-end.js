const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const server = express();

server.use(bodyParser.json());
server.use(cors());

server.listen(process.env.PORT || 3000);

const ONTARIO_BASE_URL = "http://ontariobeerapi.ca/beers";

//route to return list of all employees
server.get("/beers", (req, res) => {
    // axios.get(`${ONTARIO_BASE_URL}`)
    //     .then(function (res) {
    //         // res.send("hi");
    //     });
    res.send("hi");
});

//route to return employees by id
server.get("/employees/:id", (req, res) => {
    const eId = req.params.id;
    const results = employees.filter((emp) => emp.eId === eId);

    res.send(results);
});