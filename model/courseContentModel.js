const mongoose = require('mongoose');

const courseContentSchema = new mongoose.Schema({
    courseId: {type: mongoose.Schema.Types.ObjectId, required: true},  // will change
    downloadLink: {type: String, required: true},
    linkText: {type: String, required: true}, //source.pdf
    linkThumbNail: {type: String, required: true}
}, { collection: 'coursecontents' });

const courseContentModel = mongoose.model("coursecontents", courseContentSchema);

module.exports = courseContentModel;