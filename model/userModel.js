const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: Number, required: true },
    phone: {type: String, required: true},
    courseIds: { type: Array },
    favouriteCourseIds: { type: Array },
    // isActive: { type: Number, required: true },
  },
  { collection: "users" }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
