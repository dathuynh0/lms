import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

// middleware để phân tích JSON
app.use(express.json());
app.use(cookieParser());

// public route
app.use("/api/auth", authRoute);

// kết nối đến DB trước khi khởi động server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
  });
});
