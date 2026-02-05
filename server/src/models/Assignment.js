import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["PENDING", "SUBMITTED", "LATE"], // chưa nộp, đã nộp, nộp muộn
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  },
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;
