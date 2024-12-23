const mongoose = require("mongoose");

const statementMasterSchema = new mongoose.Schema(
  {
    statement: { type: String, required: true },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:"courses"
    },
    imgUrl:{type: String},
    status: { type: Number },
  },
  { collection: "statementMaster" }
);

const statementMasterModel = mongoose.model("statementMaster", statementMasterSchema);

module.exports = statementMasterModel;
