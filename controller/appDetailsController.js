const appDetailsModel = require("../model/appDetailsModel");

const getAppDetails = async (req, res) => {
  try {
    const appDetails = await appDetailsModel.find();
    
    res.status(200).json(appDetails);
  } catch (err) {
    console.error("Error fetching statements:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};


module.exports={getAppDetails}
