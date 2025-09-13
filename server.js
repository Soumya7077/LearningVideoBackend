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
const {
  getCourseList,
  getCoursePdfUrl,
  addFavouriteCourse,
  getFavouriteCourseList,
  getPaidCourseList,
  addCourse,
} = require("./controller/courseController");
const { connectDatabase } = require("./dbconfig");
const { getNotice } = require("./controller/noticeController");
const {
  getStatementByUserId,
  getStatementByCourseId,
  getAllStatementList,
  getStatementByJoin,
} = require("./controller/statementController");
const { getAppDetails } = require("./controller/appDetailsController");
const {
  addQuestionAnswer,
  getQuestionAnswer,
  getQuestionAnswerByCourseId,
  getCourse,
  submitAssessment,
  getAssessmentByUserId,
} = require("./controller/questionAnswerController");
const { getAllChapters } = require("./controller/chapterController");
const { createCategories, getCategories, getCategoryById, updateCategoryById } = require("./controller/category.controller");
const { createSubcategories, getSubcategoryById, updateSubcategoryById, getAllSubcategories, getSubcategoryByCategoryId } = require("./controller/subcategory.controller");
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
app.get("/getcoursepdf/:id", getCoursePdfUrl);

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
app.put("/updateuser/:id", updateUser);

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
app.get("/getuser/:userId", getUserById);

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
app.put("/updatefavcourse/:userId", addFavouriteCourse);

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
app.get("/getfavcourse/:userId", getFavouriteCourseList);

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
app.get("/getpaidcourse/:userId", getPaidCourseList);

/**======================Get favourite course list by id=============================== */

app.post("/courses", addCourse)

/**======================Get Statments by user id=============================== */
/**
 * @swagger
 * /getstatement/{userId}:
 *   get:
 *     summary: Retrieve a statement  list by User ID from user favourite and purchased courseId
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Statement list retrieved
 */
app.get("/getstatment/:userId", getStatementByUserId);

/**======================Get statement list by user id=============================== */

/**=============================Get statement list by courseId===================== */

/**
 * @swagger
 * /getstatement/{courseId}:
 *   get:
 *     summary: Retrieve a statement  list by Course ID
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Statement list retrieved
 */

app.get("/getstatementbycourse/:courseId", getStatementByCourseId);

/**=============================Get statement list by courseId===================== */

/**===============================Get All Statement list============================ */

/**
 * @swagger
 * /getstatements:
 *   get:
 *     summary: Retrieve all statement list
 *
 *     responses:
 *       200:
 *         description: Statement list retrieved
 */

app.get("/getstatements", getAllStatementList);

/**===============================Get All Statement list============================ */

/**===========================Get Statements by join============================== */

/**
 * @swagger
 * /statementslist:
 *   get:
 *     summary: Retrieve all statement list by join
 *
 *     responses:
 *       200:
 *         description: Statement list retrieved
 */

app.get("/statementslist", getStatementByJoin);

/**===========================Get Statements by join============================== */

/**===========================Get Statements by join============================== */

/**
 * @swagger
 * /getappdetails:
 *   get:
 *     summary: Retrieve all app related details
 *
 *     responses:
 *       200:
 *         description: App related details retrieved
 */

app.get("/getappdetails", getAppDetails);

/**===========================Get Statements by join============================== */

/**===========================Post all question answer data============================== */

/**
 * @swagger
 * /addquestionans:
 *   get:
 *     summary: Add question and answer with options
 *
 *     responses:
 *       200:
 *         description: Add new question and answer successfully
 */

app.post("/addquestionans", addQuestionAnswer);

/**===========================Post Question answer data============================== */

/**===========================Get all question answer data============================== */

/**
 * @swagger
 * /Get All:
 *   get:
 *     summary: Add question and answer with options
 *
 *     responses:
 *       200:
 *         description: Add new question and answer successfully
 */

app.get("/getquestionansbycourse/:courseId", getQuestionAnswerByCourseId);

/**===========================Get all question answer data============================== */

/**===========================Get all course from question answer data============================== */

/**
 * @swagger
 * /Get All:
 *   get:
 *     summary: Add question and answer with options
 *
 *     responses:
 *       200:
 *         description: Add new question and answer successfully
 */

app.get("/getcoursefromquestionans", getCourse);

/**===========================Get all question answer data============================== */

/**===========================Submit assessment by all related data============================== */

/**
 * @swagger
 * /Post All:
 *   post:
 *     summary: Submit assessment by all related data
 *
 *     responses:
 *       200:
 *         description: Add a new assessment when the valid logged in user take the assessment
 */

app.post("/submitassessment", submitAssessment);

/**===========================Submit assessment by all related data============================== */

/**===========================Create Category for course============================== */

/**
 * @swagger
 * /Post All:
 *   post:
 *     summary: create category for course
 *
 *     responses:
 *       200:
 *         description: Add a new category 
 */

app.post("/categories/add", createCategories);

/**===========================Submit assessment by all related data============================== */

app.get("/categories", getCategories);

app.get("/categories/:id", getCategoryById);

app.put("/categories/:id", updateCategoryById);

app.get("/subcategories", getAllSubcategories);


app.post("/subcategories", createSubcategories);

app.get("/subcategories/:id", getSubcategoryById);

app.put("/subcategories/:id", updateSubcategoryById);
app.get("/subcategoryByCategory/:categoryId", getSubcategoryByCategoryId);


/**===========================Submit assessment by all related data============================== */

/**
 * @swagger
 * /Get By User Id:
 *   get:
 *     summary: Get attempt assessment by user id
 *
 *     responses:
 *       200:
 *         description: Get all attempt assessment by user id
 */

app.get("/getassessment/:userId", getAssessmentByUserId);

/**===========================Submit assessment by all related data============================== */

app.get("/getchapters/:id", getAllChapters);

app.listen(process.env.appPort);
console.log(`Server Started : http://127.0.0.1:${process.env.appPort || 8000}`);
