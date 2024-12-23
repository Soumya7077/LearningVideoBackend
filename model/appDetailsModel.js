const mongoose = require('mongoose');

const appDetailsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    logout: {type: String},
    homeScreen: {type: String},
    thumbnailUrl: {type: String},
    appColor: {type: String},
    noticeIds: {type: Array},
    isActive: {type: Number}
}, { collection: 'appDetails' });

const appDetailsModel = mongoose.model("appDetails", appDetailsSchema);

module.exports = appDetailsModel;