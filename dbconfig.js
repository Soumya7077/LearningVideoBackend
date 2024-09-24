require("dotenv").config();

var mongoClient = require("mongodb").MongoClient;

const connectDatabase = async () => {
  try {
    const client = await mongoClient.connect(process.env.connectionString);

    console.log(`Connected to MongoDB database successfully.`);

    const database = client.db("learning_video");
    return database;
  } catch (err) {
    console.log("Error in db connection", err);
    throw err;
  }
};

module.exports = connectDatabase;
