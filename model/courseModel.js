
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    categoryId: {type: Number, required: true},
    subcategoryId: {type: Number, required: true},
    courseName: {type: String, required: true},
    videourl: {type: String, required: true},
    courseDesc: {type: String, required: true},
    isActive: {type: Number, required: true},
    courseImage: {type: String, required: true},
});

const courseModel = mongoose.model("courses", courseSchema);

module.exports = courseModel;
