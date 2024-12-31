const courseModel = require("../model/courseModel");
const statementMasterModel = require("../model/statementMasterModel");
const userModel = require("../model/userModel");

/**==============================Get All Statement list================================== */

const getAllStatementList = async (req, res) => {
  try {
    const statements = await statementMasterModel.find();

    if (!statements) {
      res.status(400).json({ message: "No statments found" });
      return;
    }

    res.status(200).json({ statements });
  } catch (err) {
    console.log(err);
    res.status(200).json(err);
  }
};

/**==============================Get All Statement list================================== */

/**=============================Get Statement list by login user id========================= */

const getStatementByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const statements = await fetchStatements();
    

    let loggedInUserCourse = [];
    const getUserCourse = await userModel.findById(userId.trim());

    const getPurchasedCourse = getUserCourse.courseIds;
    const getFavouriteCourseIds = getUserCourse.favouriteCourseIds;

    loggedInUserCourse.push(...getPurchasedCourse, ...getFavouriteCourseIds);

   
    

    const orderStatements = loggedInUserCourse.map(item =>  statements.find(e => e._id == item)).flat();
    
    
    
    const remainingStatements = statements.filter(item => !loggedInUserCourse.includes(item._id.toString()));

    const arrangedStatements  = orderStatements.concat(remainingStatements);

    

    res.status(200).json({
      arrangedStatements,
    });
  } catch (err) {
    console.error("Error fetching statements:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**=============================Get Statement list by login user id========================= */

/**================================Get Statement by Course Id ============================= */

const getStatementByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;

    const getStatements = await statementMasterModel.find({
      courseId: courseId,
    });

    res.status(200).json({
      getStatements,
    });
  } catch (err) {
    console.error("Error fetching statements:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**================================Get Statement by Course Id ============================= */

/**==================================Get Statements by join=============================== */

/**==================================Get Statements by join=============================== */

const fetchStatements = async () => {
  try {
    const statements = await courseModel.aggregate([
      {
        $lookup: {
          from: "statementMaster",
          localField: "_id",
          foreignField: "courseId",
          as: "statements",
        },
      },
      {
        $match: {
          "statements.0": { $exists: true },
        },
      },
    ]);
    return statements;
  } catch (err) {
    console.error("Error fetching statements:", err);
    throw new Error("Failed to fetch statements");
  }
};

/**================================Get Statement by join course id========================== */

const getStatementByJoin = async (req, res) => {
  try {
    const statements = await fetchStatements();
    res.status(200).json({ statements });
  } catch (err) {
    console.error("Error fetching statements:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**================================Get Statement by join course id========================== */

module.exports = {
  getStatementByUserId,
  getStatementByCourseId,
  getAllStatementList,
  getStatementByJoin,
};
