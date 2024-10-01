const courseModel = require("../model/courseModel");

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

module.exports = { getCourseList };
