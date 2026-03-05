import Course from "../models/Course.js";
import Assignment from "../models/Assignment.js";

export const getAllAssignmentsForCourse = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate("courseId", "title")
      .sort({ createdAt: -1 });

    return res.status(200).json(assignments);
  } catch (error) {
    console.error("Lỗi khi gọi hàm getAllAssignmentsForCourse:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

// TEACHER
export const createAssignment = async (req, res) => {
  try {
    // lấy các trường dữ liệu từ req.body
    const { title, description, expiresAt, isPublic } = req.body;

    const newAssignment = await Assignment.create({
      courseId: req.params.id,
      title,
      description,
      expiresAt,
      isPublic,
    });

    return res.status(201).json(newAssignment);
  } catch (error) {
    console.error("Lỗi khi gọi hàm createAssignment:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const updateAssignment = async (req, res) => {
  try {
    const { title, description, expiresAt, isPublic, status } = req.body;

    const updatedAssignment = await Assignment.findByIdAndUpdate(
      req.params.assignmentId,
      {
        title,
        description,
        expiresAt,
        isPublic,
        status,
      },
      {
        new: true,
      },
    );
    if (!updatedAssignment) {
      return res.status(404).json({ message: "Cập nhật không thành công" });
    }

    return res.status(200).json(updatedAssignment);
  } catch (error) {
    console.error("Lỗi khi gọi hàm updateAssignment:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const togglePublicAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Không tìm thấy bài tập" });
    }

    assignment.isPublic = !assignment.isPublic;
    await assignment.save();

    return res.status(200).json(assignment);
  } catch (error) {
    console.error("Lỗi khi gọi hàm togglePublicAssignment:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const deleteAssignment = async (req, res) => {
  try {
    const deletedAssignment = await Assignment.findByIdAndDelete(
      req.params.assignmentId,
    );
    if (!deletedAssignment) {
      return res.status(404).json({ message: "Xóa không thành công" });
    }

    return res.status(200).json({ message: "Xóa bài tập thành công" });
  } catch (error) {
    console.error("Lỗi khi gọi hàm deleteAssignment:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
