import mongoose from "mongoose";
import { DB_NAME } from "../constants";
import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
});


const connectDB = async () => {
  try {

    const connectionString = `${process.env.MONGODB_URI}/${DB_NAME}`;
    if (!connectionString) {
      console.error("MONGODB_URI environment variable is not set");
      process.exit(1);
    }

    const db = await mongoose.connect(connectionString);
    console.log(`Database is connected to: ${db.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;