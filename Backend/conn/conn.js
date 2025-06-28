const mongoose = require("mongoose");
require("dotenv").config(); // Load .env

const conn = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successfully"); //  This line now inside try block
  } catch (error) {
    console.error(" Database connection failed:", error.message);
  }
};

conn(); // Run the async connection function
