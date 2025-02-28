const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    optionAttendByUser: { type: Array, required: true },
    assessmentType: { type: String, required: true },
  },
  { collection: "assessments" }
);

const assessmentModel = mongoose.model("assessments", assessmentSchema);

module.exports = assessmentModel;
