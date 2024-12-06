const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    purchaseDate: { type: String, required: true },
  },

  { collection: "userCourse" }
);

const userCourseModel = mongoose.model("userCourse", userSchema);

module.exports = userCourseModel;
