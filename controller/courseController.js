const courseContentModel = require("../model/courseContentModel");
const courseModel = require("../model/courseModel");
const mongoose = require("mongoose");
const userModel = require("../model/userModel");
const userCourseModel = require("../model/userCourseModel");

/**======================Get All Courses======================= */

const getCourseList = async (req, res) => {
  const { limit } = req.query;
  try {
    const courselist = await courseModel.find({}).limit(limit).exec();
    res.send(courselist);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Error fetching course list" });
  }
};

/**======================Get All Courses======================= */

/**======================Get Course Pdf======================= */

const getCoursePdfUrl = async (req, res) => {
  const { id } = req.params;

  try {
    // Convert `id` to a Mongoose ObjectId
    const coursePdf = await courseContentModel.findOne({
      courseId: new mongoose.Types.ObjectId(id),
    });

    if (!coursePdf) {
      return res.status(404).json({ error: "Course PDF not found" });
    }

    res.send(coursePdf);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching course pdf" });
  }
};

/**======================Get Course Pdf======================= */

/**========================Adding favourite course =================== */

const addFavouriteCourse = async (req, res) => {
  try {
    const { courseIds } = req.body;
    const { userId } = req.params;

    const user = await userModel.findById(userId.trim());
    let updateFavouriteCourse;

    if (user.favouriteCourseIds.includes(courseIds)) {
      var index = user.favouriteCourseIds.indexOf(courseIds);
      if (index > -1) {
        user.favouriteCourseIds.splice(index, 1);
      }
      updateFavouriteCourse = await user.save();
    } else {
      user.favouriteCourseIds.push(courseIds);
      updateFavouriteCourse = await user.save();
    }

    res.status(200).json({
      updatedCourse: updateFavouriteCourse,
      message: "Favourite course Updated Successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

/**========================Adding favourite course =================== */

/**=============================Get favourite course list=============== */

const getFavouriteCourseList = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId.trim());

    const favouriteCourseIds = user.favouriteCourseIds;
    let courseList = [];
    for (var favouriteCourseId of favouriteCourseIds) {
      const getCourseDetails = await courseModel.findById(favouriteCourseId);
      courseList.push(getCourseDetails);
    }
    res.status(200).json({
      favouriteCourseList: courseList,
      message: "Favourite course retrieved Successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

/**=============================Get favourite course list ============= */

/**=============================Get paid course list ============= */

const getPaidCourseList = async (req, res) => {
  const { userId } = req.params;

  try {
    const getPaidCourses = await userCourseModel.find({
      userId: new mongoose.Types.ObjectId(userId),
    });

    const courseList = [];

    for (const paidCourse of getPaidCourses) {
      const course = await courseModel.findById(paidCourse.courseId);

      if (course) {
        const purchaseDate = new Date(paidCourse.purchaseDate);
        const expiryDate = new Date(purchaseDate);
        expiryDate.setDate(expiryDate.getDate() + course.courseDuration);

        courseList.push({
          ...paidCourse._doc,
          ...course._doc,
          expiryDate,
        });
      }
    }

    res.status(200).send(courseList);
  } catch (error) {
    console.error("Error fetching paid courses:", error);
    res.status(500).send({ message: "Failed to fetch courses" });
  }
};

/**=============================Get paid course list ============= */

module.exports = {
  getCoursePdfUrl,
  getCourseList,
  addFavouriteCourse,
  getFavouriteCourseList,
  getPaidCourseList,
};
