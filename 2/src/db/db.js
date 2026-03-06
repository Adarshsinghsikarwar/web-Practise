import mongoose from "mongoose";

async function connectToDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/Auth");
    console.log("successfully connected to the DB");
  } catch (err) {
    console.log("Failed tot he connected to DB", err.message);
    process.exit(1);
  }
}
export default connectToDB;
