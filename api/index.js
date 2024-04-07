import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/dbConfig.js";
import userRoute from "./routes/user.route.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/user", userRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  dbConnection();
  console.log(`App is running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
