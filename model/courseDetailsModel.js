const mongoose = require('mongoose');

const courseDetailsSchema = new mongoose.Schema({
    courseId: {type: Number, required: true},
    about: {type: String, required: true},
    shortDesc: {type: String},
    lengthInHrs: {type: String, required: true},
    courseSectionIds: {type: Array, required: true},
    subjectIds: {type: Array, required: true},
});

const courseDetailsModel = mongoose.model("coursedetails", courseDetailsSchema);

module.exports = courseDetailsModel;