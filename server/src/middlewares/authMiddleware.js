import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const protectedRoute = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // token dang `Bearer accessToken`
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const user = await User.findById(decoded.userId).select("-password"); // lay thong tin user khong lay password
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      req.user = user; // gan thong tin user vao request de su dung o cac controller sau
      next();
    });
  } catch (error) {
    console.error("Lỗi khi gọi hàm authMiddleware:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
