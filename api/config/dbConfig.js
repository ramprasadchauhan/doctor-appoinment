import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database is connected");
  } catch (error) {
    console.log("Database connection failed", error);
  }
};

export default dbConnection;
