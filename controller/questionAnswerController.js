const { default: mongoose } = require("mongoose");
const questionAnswerModel = require("../model/questionAnswerModel");
const courseModel = require("../model/courseModel");
const assessmentModel = require("../model/assessmentModel");

/**=============================Add question answer in table======================== */

const addQuestionAnswer = async (req, res) => {
  try {
    const { courseId, question, options, correctAnswer } = req.body;

    const newQuestionAnswer = new questionAnswerModel({
      courseId: new mongoose.Types.ObjectId(courseId),
      question: question,
      options: options,
      correctAnswer: correctAnswer,
    });

    const questionAnswer = await newQuestionAnswer.save();

    res.status(200).json({
      message: "Question Answer added successfully",
      questionAnswer: questionAnswer,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**=============================Add question answer in table======================== */

/**==============================Get All question answer in table====================== */

const getQuestionAnswer = async (req, res) => {
  try {
    const questionAnswer = await questionAnswerModel.find({});
    if (!questionAnswer || questionAnswer.length === 0) {
      return res.status(404).json({ message: "No question answer found" });
    }
    res.status(200).json(questionAnswer);
  } catch (err) {
    console.error("Error fetching question answer:", err.message);
    res.status(500).json({ error: "Error fetching question answer" });
  }
};

/**==============================Get All question answer in table====================== */

/**==============================Get question answer by course id====================*/

const getQuestionAnswerByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 1;

    const questionAnswer = await questionAnswerModel
      .find({
        courseId: courseId,
      })
      .skip(page - 1)
      .limit(limit)
      .exec();

    const totalDocuments = await questionAnswerModel.countDocuments({
      courseId: courseId,
    });

    res.status(200).json({
      page,
      limit,
      totalDocuments,
      totalPages: Math.ceil(totalDocuments / limit),
      questionAnswer,
    });
  } catch (err) {
    console.error("Error fetching question answer:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**==============================Get question answer by course id====================*/

/**===============================Get course from course id======================== */

const getCourse = async (req, res) => {
  try {
    const course = await courseModel.aggregate([
      {
        $lookup: {
          from: "questionAnswer",
          localField: "_id",
          foreignField: "courseId",
          as: "course",
        },
      },
      {
        $match: {
          "course.0": { $exists: true },
        },
      },
    ]);

    res.status(200).json({ course });
  } catch (err) {
    console.error("Error fetching course:", err);
    throw new Error("Failed to fetch course");
  }
};

/**===============================Get course from course id======================== */

/**===========================================Post question answer with all related data======================= */

const submitAssessment = async (req, res) => {
  try {
    const {
      userId,
      optionAttendByUser,
      courseId,
      assessmentType,
      totalScore
    } = req.body;

    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const course= await courseModel.findById(courseId);
    const courseName = course.courseName;
    const currentData = new Date();
    const monthName = month[currentData.getMonth()];
    const noOfQuestion = optionAttendByUser.length;
    const assessmentName = `${currentData.getDate()}${monthName}${currentData.getFullYear()}_${courseName}_${noOfQuestion}`;

    const newAssessment = new assessmentModel({
      userId: new mongoose.Types.ObjectId(userId),
      optionAttendByUser: optionAttendByUser,
      courseId: new mongoose.Types.ObjectId(courseId),
      assessmentType: assessmentType,
      totalScore:totalScore,
      assessmentName: assessmentName,
    });

    const saveAssessment = await newAssessment.save();

    res.status(200).json({
      message: "Your assessment submitted successfully",
      questionAnswer: saveAssessment,
    });
  } catch (err) {
    console.log("Error submitting assessment: ", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**===========================================Post question answer with all related data======================= */



/**============================================Get Assessment based on User id================================ */

  const getAssessmentByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
      const limit = parseInt(req.query.limit) || 5;
      const page = parseInt(req.query.page) || 1;
  
      const assessment = await assessmentModel
        .find({
          userId: userId,
          assessmentType:"assessment"
        })
        .skip(page - 1)
        .limit(limit)
        .exec();
  
      const totalDocuments = await assessmentModel.countDocuments({
        userId: userId,
      });
  
      res.status(200).json({
        page,
        limit,
        totalDocuments,
        totalPages: Math.ceil(totalDocuments / limit),
        assessment,
      });
    } catch (err) {
      console.error("Error fetching assessment:", err);
      res.status(500).json({ message: "Something went wrong" });
    }
  };


/**============================================Get Assessment based on User id================================ */


module.exports = {
  addQuestionAnswer,
  getQuestionAnswer,
  getQuestionAnswerByCourseId,
  getCourse,
  submitAssessment,
  getAssessmentByUserId
};
