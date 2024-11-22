const mongoose = require("mongoose");

const auditTrailSchema = new mongoose.Schema(
  {
    // userName: {type: String, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    loginDate: { type: Date, required: true }, //timestamp
  },
  { collection: "auditTrail" }
);

const auditTrailModel = mongoose.model("auditTrail", auditTrailSchema);

module.exports = auditTrailModel;
