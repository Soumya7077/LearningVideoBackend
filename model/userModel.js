const connectDatabase = require("../dbconfig");

const userModel = async () => {
  try {
    const connectDb = await connectDatabase();
    const usercollection = connectDb.collection("users");
    return usercollection;
  } catch (err) {
    console.log("Error in user model", err);
  }
};

module.exports = userModel;
