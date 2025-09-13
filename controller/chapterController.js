const { default: mongoose } = require("mongoose");
const chaptersModel = require("../model/chapterModel");

const getAllChapters = async (req, res) => {
    const { id } = req.params;

  try {
    const chapters = await chaptersModel.find({
        courseId: new mongoose.Types.ObjectId(id),
      }).exec();
  
      if (!chapters) {
        return res.status(404).json({ error: "No Chapters Found" });
      }
  
      res.send(chapters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching chapters" });
  }
};


const createChapters = async (req, res) => {
  try{
    const {courseId, chapterName, chapterTiming,  chapterDescription, videoUrl} = req.body;

    const chapter = await chaptersModel.create({
      courseId: new mongoose.Types.ObjectId(courseId),
      chapterName,
      chapterTiming,
      chapterDesc: chapterDescription,
      videoUrl,
      // isActive:1
    })

    if(chapter){
        return res.status(200).json({
            status: true,
            message: "Chapter added successfully",
            data: chapter,
          })
    }

  }catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching chapters" });
  }
}


module.exports = {
    getAllChapters,
    createChapters
}


