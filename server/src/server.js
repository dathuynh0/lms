import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import courseRoute from "./routes/courseRoute.js";
import assignmentRoute from "./routes/assignmentRoute.js";
import submissionRoute from "./routes/submissionRoute.js";
import { protectedRoute } from "./middlewares/authMiddleware.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

// các middleware
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads")); // cho phép truy cập vào thư mục uploads để lấy file

// public route
app.use("/api/auth", authRoute);

// protected route
app.use(protectedRoute);
app.use("/api/users", userRoute);
app.use("/api/courses", courseRoute);
app.use("/api/assignments", assignmentRoute);
app.use("/api/submissions", submissionRoute);

// kết nối đến DB trước khi khởi động server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
  });
});
