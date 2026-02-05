import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
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
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
      default: null,
      min: 0,
      max: 10,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Exam = mongoose.model("Exam", examSchema);

export default Exam;
