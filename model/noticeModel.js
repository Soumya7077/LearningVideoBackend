const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  descShort: { type: String, required: true },
  descLong: { type: String, required: true },
  image: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Number, required: true },
}); 

const noticeModel = mongoose.model("notices", noticeSchema);

module.exports = noticeModel;
