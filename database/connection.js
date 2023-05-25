const mongoose = require("mongoose");
require("dotenv").config();

const mongoString = process.env.DATABASE_URL;

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  mongoose.connect(mongoString);
  const database = mongoose.connection;

  database.on("error", (error) => {
    console.log(error);
  });

  database.once("connected", () => {
    console.log("Database Connected");
  });
};

module.exports = connectDB;
