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
    totalScore:{type:Number,required:true},
    assessmentName: { type: String, required: true },
    assessmentDate: { type: Date, default: Date.now },
  },
  { collection: "assessments" }
);

const assessmentModel = mongoose.model("assessments", assessmentSchema);

module.exports = assessmentModel;
