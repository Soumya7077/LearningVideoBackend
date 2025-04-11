const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema(
  {
    courseId: {type: mongoose.Schema.Types.ObjectId , required: true},
    chapterName: {type: String, required: true},
    chapterDesc: {type: String, required: true},
    videoUrl: {type: String, required: true},
    chapterTiming: {type: String, required: true},
  },
  { collection: "chapters" }
);

const chaptersModel = mongoose.model("chapters", chapterSchema);

module.exports = chaptersModel;
