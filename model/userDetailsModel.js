const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {type: String, required: true, unique: true},
    displayName: {type: String, required: true},
    dob: {type: String, required: true},
    qualificationIds: {type: Array},
    isActive: {type: Number, required: true}
});

const userDetailsModel = mongoose.model("users", userSchema);


module.exports = userDetailsModel;
