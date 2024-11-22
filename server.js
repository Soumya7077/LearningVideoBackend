var express = require("express");
var cors = require("cors");
const {
  getUser,
  validateLogin,
  registerUser,
  updateUser,
} = require("./controller/userController");
const { getCourseList, getCoursePdfUrl } = require("./controller/courseController");
const { connectDatabase } = require("./dbconfig");
const { getNotice } = require("./controller/noticeController");
require("dotenv").config();

var app = express();
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

connectDatabase();

/** =====================Get All user data ================================*/

app.get("/users", getUser);

/** =====================Get All user data ================================*/

/**==============================Login validation========================= */

app.post("/login", validateLogin);

/**==============================Login validation========================= */

/**================================Register user========================== */

app.post("/signup", registerUser);

/**================================Register user========================== */

/**==============================Get All Courses======================== */

app.get("/courseList", getCourseList);

/**==============================Get All Courses======================== */

/**===============================Get All Notice========================== */

app.get("/noticelist", getNotice);

/**===============================Get All Notice========================== */

/**===============================Get pdf  of course=================== */

  app.get('/getcoursepdf/:id', getCoursePdfUrl);

/**===============================Get pdf  of course=================== */

/**=============================Update User============================ */

  app.put('/updateuser/:id', updateUser);

/**=============================Update User============================ */


app.listen(process.env.appPort);
console.log(`Server Started : http://127.0.0.1:8080`);
