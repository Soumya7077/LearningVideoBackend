const mongoose = require('mongoose');

const courseSectionSchema = new mongoose.Schema({
    courseDetailsId: {type: Number, required: true},
    sectionDesc: {type: String, required: true},
    sectionStartTime: {type: String, required: true},
    sectionEndTime: {type: String, required: true}
}, { collection: 'courseSection' });

const courseSectionModel = mongoose.model("courseSection", courseSectionSchema);

module.exports = courseSectionModel;