const mongoose = require("mongoose");

const questionAnswerSchema= new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    question: { type: String, required: true },
    options: { type: Array, required: true },
    correctAnswer: { type: String, required: true },
    
  },
  { collection: "questionAnswer" }
);

const questionAnswerModel = mongoose.model("questionAnswer", questionAnswerSchema);

module.exports = questionAnswerModel;
