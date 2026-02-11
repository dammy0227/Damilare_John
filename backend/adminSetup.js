import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Admin from "./models/Admin.js";

dotenv.config();
connectDB();

const createAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ username: "damilare" });

    if (adminExists) {
      console.log("Admin already exists");
      process.exit();
    }

    const admin = await Admin.create({
      username: "damilare",
      password: "kizdami123", 
    });

    console.log("Admin created:", admin.username);
    process.exit(); 
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();
