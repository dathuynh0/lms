import Course from "../models/Course.js";

export const checkCourseMembership = async (req, res, next) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Không tìm thấy khóa học" });
    }

    const isMember = course.members.some(
      (member) => member.userId.toString() === req.user._id.toString(),
    );
    if (!isMember) {
      return res
        .status(403)
        .json({ message: "Bạn chưa tham gia khóa học này" });
    }

    next();
  } catch (error) {
    console.error("Lỗi khi gọi middleware checkCourseMembership:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const checkCourseRole = async (req, res, next) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findById(courseId);

    if (course.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Bạn không có quyền" });
    }

    next();
  } catch (error) {
    console.error("Lỗi khi gọi middleware checkCourseRole:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
