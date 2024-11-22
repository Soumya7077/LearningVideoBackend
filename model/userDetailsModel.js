const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    displayName: { type: String, required: true },
    dob: { type: String, required: true },
    qualificationIds: { type: Array },
    subjectIds: { type: Array },
    isActive: { type: Number, required: true },
  },
  { collection: "userDetails" }
);

const userDetailsModel = mongoose.model("userDetails", userSchema);

module.exports = userDetailsModel;
