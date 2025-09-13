const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    isActive: { type: Number, required: true },
  },
  { collection: "categories" }
);

const categoryModel = mongoose.model("categories", categorySchema);

module.exports = categoryModel;
