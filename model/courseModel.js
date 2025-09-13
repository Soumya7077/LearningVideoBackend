const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    categoryId: { type: Object, required: true },
    subcategoryId: { type: Object, required: true },
    courseName: { type: String, required: true },
    videourl: { type: String, required: false },
    courseDesc: { type: String, required: true },
    isActive: { type: Number, required: true },
    courseImage: { type: String, required: true },
    courseType: { type: Number, required: true },
    // courseExpiresOn: { type: String, required: true },
    courseDuration: { type: Number, required: true },
  },
  { collection: "courses" }
);

const courseModel = mongoose.model("courses", courseSchema);

module.exports = courseModel;
