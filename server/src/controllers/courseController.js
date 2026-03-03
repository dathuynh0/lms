import Course from "../models/Course.js";

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 }); // Sắp xếp theo ngày tạo giảm dần

    return res.status(200).json(courses);
  } catch (error) {
    console.error("Lỗi khi gọi hàm getAllCourses:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const createCourse = async (req, res) => {
  try {
    const { title, description, courseCode, accessCode, thumbnailUrl } =
      req.body;
    const newCourse = await Course.create({
      createdBy: req.user._id,
      title,
      description,
      courseCode,
      accessCode,
      thumbnailUrl,
    });

    return res.status(201).json(newCourse);
  } catch (error) {
    console.error("Lỗi khi gọi hàm createCourse:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

// join course
export const joinCourse = async (req, res) => {
  try {
    const { accessCode } = req.body;
    if (!accessCode) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập mật khẩu tham gia khóa học" });
    }

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Không tìm thấy khóa học" });
    }

    // kiem tra access code tu user
    if (accessCode.trim() !== course.accessCode.trim()) {
      return res
        .status(403)
        .json({ message: "Mật khẩu tham gia khóa học không đúng" });
    }

    // kiem tra user da la thanh vien chua
    const isAlreadyMember = course.members.some((member) =>
      member.userId.equals(req.user._id),
    );
    if (isAlreadyMember) {
      return res
        .status(400)
        .json({ message: "Bạn đã là thành viên của khóa học này" });
    }

    // thêm user vào danh sách thành viên của khóa học
    course.members.push({ userId: req.user._id });
    await course.save();

    return res
      .status(200)
      .json({ message: "Tham gia khóa học thành công", course });
  } catch (error) {
    console.error("Lỗi khi gọi hàm joinCourse:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const deleteCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deleteCourse) {
      return res
        .status(404)
        .json({ message: "Xóa không thành công, không tìm thấy khóa học" });
    }

    return res.status(200).json({ message: "Xóa khóa học thành công" });
  } catch (error) {
    console.error("Lỗi khi gọi hàm deleteCourse:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const deleteMember = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Không tìm thấy khóa học" });
    }
    // kiem tra quyen cua user
    if (
      req.user._id.toString() !== course.createdBy.toString() &&
      req.user.role !== "ADMIN"
    ) {
      return res.status(403).json({
        message: "Bạn không có quyền xóa thành viên khỏi khóa học này",
      });
    }

    // xóa user khỏi danh sách thành viên của khóa học
    course.members = course.members.filter(
      (member) => member.userId.toString() !== req.body.userId,
    );
    await course.save();

    return res
      .status(200)
      .json({ message: "Xóa user khỏi khóa học thành công", course });
  } catch (error) {
    console.error("Lỗi khi gọi hàm deleteMember:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
