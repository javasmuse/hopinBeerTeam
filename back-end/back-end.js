const bodyParser = require("body-parser");
const cors = require("cors");
const server = express();

server.use(bodyParser.json());
server.use(cors());

server.listen(process.env.PORT || 3000);

const ONTARIO_BASE_URL = "http://ontariobeerapi.ca/beers";

//route to return list of all employees
server.get("/beers", (req, res) => {
    /
    res.send("hi");
});