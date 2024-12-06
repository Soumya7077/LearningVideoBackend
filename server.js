var express = require("express");
var cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const {
  getUser,
  validateLogin,
  registerUser,
  updateUser,
  getUserById,
} = require("./controller/userController");
const { getCourseList, getCoursePdfUrl, addFavouriteCourse, getFavouriteCourseList, getPaidCourseList } = require("./controller/courseController");
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

/** Swagger Configuration */
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API documentation for the application",
      contact: {
        name: "Soumya Ranjan ",
        email: "soumya05ranjan@gmail.com",
      },
    },
    servers: [
      {
        url: `http://127.0.0.1:${process.env.appPort || 8080}`,
        description: "Local server",
      },
    ],
  },
  apis: ["./server.js"], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/** =====================Get All user data ================================*/
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: List of users
 */
app.get("/users", getUser);

/** =====================Get All user data ================================*/

/**==============================Login validation========================= */
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Validate user login
 *     responses:
 *       200:
 *         description: Login successful
 */
app.post("/login", validateLogin);

/**==============================Login validation========================= */

/**================================Register user========================== */
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     responses:
 *       201:
 *         description: User registered successfully
 */
app.post("/signup", registerUser);

/**================================Register user========================== */

/**==============================Get All Courses======================== */
/**
 * @swagger
 * /courseList:
 *   get:
 *     summary: Retrieve a list of courses
 *     responses:
 *       200:
 *         description: List of courses
 */
app.get("/courseList", getCourseList);

/**==============================Get All Courses======================== */

/**===============================Get All Notice========================== */
/**
 * @swagger
 * /noticelist:
 *   get:
 *     summary: Retrieve a list of notices
 *     responses:
 *       200:
 *         description: List of notices
 */
app.get("/noticelist", getNotice);

/**===============================Get All Notice========================== */

/**===============================Get pdf of course=================== */
/**
 * @swagger
 * /getcoursepdf/{id}:
 *   get:
 *     summary: Retrieve a course PDF by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Course ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: PDF URL retrieved
 */
app.get('/getcoursepdf/:id', getCoursePdfUrl);

/**===============================Get pdf of course=================== */

/**=============================Update User============================ */
/**
 * @swagger
 * /updateuser/{id}:
 *   put:
 *     summary: Update user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User updated
 */
app.put('/updateuser/:id', updateUser);

/**=============================Update User============================ */

/**======================Get user by id=============================== */
/**
 * @swagger
 * /getuser/{userId}:
 *   get:
 *     summary: Retrieve a user by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved
 */
app.get('/getuser/:userId', getUserById);

/**======================Get user by id=============================== */

/**======================Add favourite course=============================== */
/**
 * @swagger
 * /updatefavcourse/{userId}:
 *   put:
 *     summary: Add a favourite course for a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Favourite course added
 */
app.put('/updatefavcourse/:userId', addFavouriteCourse);

/**======================Add favourite course=============================== */

/**======================Get favourite course list by id=============================== */
/**
 * @swagger
 * /getfavcourse/{userId}:
 *   get:
 *     summary: Retrieve a user's favourite course list by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Favourite course list retrieved
 */
app.get('/getfavcourse/:userId', getFavouriteCourseList);

/**======================Get favourite course list by id=============================== */


/**======================Get favourite course list by id=============================== */
/**
 * @swagger
 * /getpaidcourse/{userId}:
 *   get:
 *     summary: Retrieve a user's favourite course list by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paid course list retrieved
 */
app.get('/getpaidcourse/:userId', getPaidCourseList);

/**======================Get favourite course list by id=============================== */

app.listen(process.env.appPort);
console.log(`Server Started : http://127.0.0.1:${process.env.appPort || 8080}`);
