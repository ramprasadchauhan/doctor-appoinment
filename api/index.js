import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/dbConfig.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  dbConnection();
  console.log(`App is running on port ${PORT}`);
});
