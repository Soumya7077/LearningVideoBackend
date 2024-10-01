
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    userType: {type: Number, required: true},
    isActive: {type: Number, required: true}
});

const userModel = mongoose.model("users", userSchema);


module.exports = userModel;
