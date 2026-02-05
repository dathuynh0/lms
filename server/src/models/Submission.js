import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
      index: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    content: {
      type: String,
      default: null,
      trim: true,
    },
    file: {
      type: String,
      default: null,
    },
    score: {
      type: Number,
      default: null,
      min: 0,
      max: 10,
    },
  },
  {
    timestamps: true,
  },
);

// 1 student chi submit 1 lan cho 1 assignment
submissionSchema.index({ assignmentId: 1, studentId: 1 }, { unique: true });

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
