const courseModel = require("../model/courseModel")


/**======================Get All Courses======================= */

const getCourseList = async(limit) => {
    const lim = parseInt(limit);
    var courseList = await courseModel();
    const documents = await courseList.find().limit(lim).toArray();
    return documents;
}

/**======================Get All Courses======================= */


module.exports = {getCourseList};