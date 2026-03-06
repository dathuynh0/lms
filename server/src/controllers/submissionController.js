import Assignment from "../models/Assignment.js";
import Submission from "../models/Submission.js";

export const submitAssignmentForFile = async (req, res) => {
  try {
    const file = req.file; // Lấy file đã được xử lý bởi Multer
    if (!file) {
      return res.status(400).json({ message: "Chưa có file nào được tải lên" });
    }

    const assignment = await Assignment.findById(req.params.assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Bài tập không tồn tại" });
    }

    assignment.status = "SUBMITTED";
    await assignment.save();

    const submission = new Submission({
      assignmentId: req.params.assignmentId,
      studentId: req.user.id,
      file: file.path,
    });
    await submission.save();

    return res.status(201).json({ message: "Nộp bài thành công", submission });
  } catch (error) {
    console.error("Lỗi khi gọi hàm submitAssignmentForFile:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const submitAssignmentForContent = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res
        .status(400)
        .json({ message: "Nội dung bài nộp không được để trống" });
    }

    const assignment = await Assignment.findById(req.params.assignmentId);
    assignment.status = "SUBMITTED";
    await assignment.save();

    const submission = new Submission({
      assignmentId: req.params.assignmentId,
      studentId: req.user.id,
      content,
    });
    await submission.save();

    return res.status(201).json({ message: "Nộp bài thành công", submission });
  } catch (error) {
    console.error("Lỗi khi gọi hàm submitAssignmentForContent:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const editingAssignmentForFile = async (req, res) => {
  try {
  } catch (error) {
    console.error("Lỗi khi gọi hàm editingAssignmentForFile:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const editingAssignmentForContent = async (req, res) => {
  try {
    const { content } = req.body;

    const updatedSubmission = await Submission.findOneAndUpdate(
      req.params.submissionId,
      {
        content,
      },
      {
        new: true,
      },
    );
    if (!updatedSubmission) {
      return res.status(404).json({ message: "Cập nhật bài nộp thất bại" });
    }

    return res
      .status(200)
      .json({ message: "Cập nhật bài nộp thành công", updatedSubmission });
  } catch (error) {
    console.error("Lỗi khi gọi hàm editingAssignmentForContent:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
