import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/dbConfig.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import adminRoute from "./routes/admin.route.js";
import doctorRoute from "./routes/doctor.route.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/doctor", doctorRoute);
app.use("/api/admin", adminRoute);

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
