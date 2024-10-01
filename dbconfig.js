require("dotenv").config();

var mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("Db connected");
    });
  } catch (err) {
    console.log("Error in db connection", err);
    throw err;
  }
};

module.exports = {connectDatabase};
