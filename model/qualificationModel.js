

const mongoose = require("mongoose");

const qualificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
}, { collection: 'qualification' }); 

const qualificationModel = mongoose.model("qualification", qualificationSchema);

module.exports = qualificationModel;