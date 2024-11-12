const mongoose = require('mongoose');

const courseInstructorSchema = new mongoose.Schema({
    instructorName: {type: String, required: true},
    instructorQualification: {type: Array, required: true},
    aboutInstructor: {type: String, required: true},
    profilePhoto: {type: String, required: true}
});

const courseInstructorModel = mongoose.model("courseInstructor", courseInstructorSchema);

module.exports = courseInstructorModel;