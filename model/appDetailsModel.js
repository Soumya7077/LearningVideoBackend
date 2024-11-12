const mongoose = require('mongoose');

const appDetailsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    logout: {type: String, required: true},
    homeScreen: {type: String, required: true},
    thumbnailUrl: {type: String, required: true},
    appColor: {type: String, required: true},
    noticeIds: {type: Array, required: true}
});

const appDetailsModel = mongoose.model("appDetails", appDetailsSchema);

module.exports = appDetailsModel;