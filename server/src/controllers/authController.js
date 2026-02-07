import User from "../models/User.js";
import Session from "../models/Session.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 100; // 14 ngày tính theo mls

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

export const signInController = async (req, res) => {
  try {
    // lay cac truong tu request body
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "username hoặc password không được bỏ trống" });
    }

    // kiem tra username
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .json({ message: "username hoặc password không đúng" });
    }

    // kiem tra password
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res
        .status(401)
        .json({ message: "username hoặc password không đúng" });
    }

    // tạo accessToken và refreshToken
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
    );

    const refreshToken = crypto.randomBytes(64).toString("hex"); // mã ngẫu nhiên

    // Lưu refreshToken
    await Session.create({
      userId: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
    });

    // lưu refeshToken vào cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: REFRESH_TOKEN_TTL,
    });

    // trả về accessToken cho client
    return res.status(200).json({
      message: `${user.displayName} đăng nhập thành công với accessToken: `,
      accessToken,
    });
  } catch (error) {
    console.error("Lỗi khi gọi hàm signInController:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const signOutController = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken; // lấy token từ cookie
    if (token) {
      // xóa refreshToken khỏi Session
      await Session.deleteOne({ refreshToken: token });

      // xóa ở cookie
      res.clearCookie("refreshToken");
    }

    return res.sendStatus(204);
  } catch (error) {
    console.error("Lỗi khi gọi hàm signOutController:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
