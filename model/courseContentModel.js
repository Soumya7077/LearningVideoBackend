const mongoose = require('mongoose');

const courseContentSchema = new mongoose.Schema({
    courseId: {type: Number, required: true},  // will change
    downloadLink: {type: String, required: true},
    linkText: {type: String, required: true}, //source.pdf
    linkThumbNail: {type: String, required: true}
});

const courseContentModel = mongoose.model("courseContent", courseContentSchema);

module.exports = courseContentModel;