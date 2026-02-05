import User from "../models/User.js";
import bcrypt from "bcrypt";

export const signUpController = async (req, res) => {
  try {
    // lay cac truong tu request body
    const { username, email, password, displayName, phone } = req.body;
    if (!username || !email || !password || !displayName) {
      return res.status(400).json({
        message: "username, email, password va displayName không được bỏ trống",
      });
    }

    // kiểm tra username, email đã tồn tại chưa
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "User đã tồn tại" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: "Email đã tồn tại" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10); // saltRound 10

    // tạo User
    await User.create({
      username,
      email,
      password: hashedPassword,
      displayName,
      phone,
    });

    return res.sendStatus(204);
  } catch (error) {
    console.error("Lỗi khi gọi hàm signUpController:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const signInController = async (req, res) => {};

export const signOutController = async (req, res) => {};
