// utils/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Access the variable from .env
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("Databse Connected successfully");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;