var express = require("express");
var cors = require("cors");
const { getUser, validateLogin } = require("./controller/userController");
require("dotenv").config();

var app = express();
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

/** =====================Get All user data ================================*/

app.get("/users", async (req, res) => {
  try {
    const users = await getUser();
    res.send(users);
  } catch (err) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

/** =====================Get All user data ================================*/

/**==============================Login validation========================= */

app.get("/login", async (req, res) => {
  try {
    const {username, password} = req.body;
    const isLoggedIn = await validateLogin(username, password);
    res.send(isLoggedIn);
  } catch (err) {
    res.status(500).json({ error: "Error in login" });
  }
});

/**==============================Login validation========================= */

app.listen(process.env.appPort);
console.log(`Server Started : http://127.0.0.1:8080`);
