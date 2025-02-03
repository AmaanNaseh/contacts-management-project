require("dotenv").config(); // maybe not needed
const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Mongodb: ");
    //connect.connection.host, connect.connection.name - displays some properties of host (when mongodb used in local vs code)
  } catch (error) {
    console.log(error);
    process.exit(1); // to terminate code with status code given here
  }
};

module.exports = connectDb;
