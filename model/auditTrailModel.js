const mongoose = require('mongoose');

const auditTrailSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    loginDate: {type: Date, required: true} //timestamp
});

const auditTrailModel = mongoose.model("auditTrail", auditTrailSchema);

module.exports = auditTrailModel;