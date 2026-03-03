import User from "../models/User.js";

export const fetchMe = async (req, res) => {
  try {
    const user = req.user;

    return res.status(200).json(user);
  } catch (error) {
    console.error("Lỗi khi gọi hàm fetchMe:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

// ADMIN CONTROLLER
export const fetchAllUsers = async (req, res) => {
  try {
    const users = (await User.find().select("-password")).sort({
      createdAt: -1,
    }); // loại bỏ trường password khỏi kết quả trả về

    return res.status(200).json(users);
  } catch (error) {
    console.error("Lỗi khi gọi hàm fetchAllUsers:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, email, password, displayName, phone, avatarUrl, role } =
      req.body;

    const user = await User.create({
      username,
      email,
      password,
      displayName,
      phone,
      avatarUrl,
      role,
    });

    return res.status(201).json({ message: "Tạo user thành công", user });
  } catch (error) {
    console.error("Lỗi khi gọi hàm createUser:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const updateRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy user" });
    }
    user.role = req.body.role;
    await user.save();

    return res.status(200).json({ message: "Cập nhât role thành công", user });
  } catch (error) {
    console.error("Lỗi khi gọi hàm updateRole:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deleteUser = await User.findByIdAndDelete(userId);
    if (!deleteUser) {
      return res
        .status(404)
        .json({ message: "Xoa không thành công, không tìm thấy user" });
    }

    return res.status(200).json({ message: "Xóa user thành công" });
  } catch (error) {
    console.error("Lỗi khi gọi hàm deleteUser:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
