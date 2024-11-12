
const mongoose = require('mongoose');

const courseCategorySchema = new mongoose.Schema({
    courseIds: {type: Array, required: true},
});

const courseCategoryModel = mongoose.model("courseCategory", courseCategorySchema);

module.exports = courseCategoryModel;