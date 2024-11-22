const courseContentModel = require("../model/courseContentModel");
const courseModel = require("../model/courseModel");
const mongoose = require('mongoose');

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
    const coursePdf = await courseContentModel.findOne({ courseId: new mongoose.Types.ObjectId(id) });

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



module.exports = {getCoursePdfUrl, getCourseList  };
