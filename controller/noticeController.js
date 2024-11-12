const noticeModel = require("../model/noticeModel");

const getNotice = async (req, res) => {
  try {
    const notices = await noticeModel.find({ isActive: 1 });
    res.status(200).json(notices);
  } catch (err) {
    console.error("Error fetching notice:", err.message); // Log the error for debugging
    res.status(500).json({ error: "Error fetching notice" });
  }
};

module.exports = { getNotice };
