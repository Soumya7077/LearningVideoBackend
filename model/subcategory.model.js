const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema(
  {
    categoryId: {type: mongoose.Schema.Types.ObjectId , required: true},
    subcategoryName: {type: String, required: true},
    isActive: {type: Number, required: true},
  },
  { collection: "subcategories" }
);

const subcategoryModel = mongoose.model("subcategories", subcategorySchema);

module.exports = subcategoryModel;
