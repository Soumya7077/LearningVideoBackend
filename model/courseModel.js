const connectDatabase = require("../dbconfig");


const courseModel = async() => {
    try{
        const connectDb = await connectDatabase();
        const courseCollection = connectDb.collection("courses");
        return courseCollection;
    }catch(err){
        console.log("Error in user model", err);
    }
}

module.exports = courseModel;