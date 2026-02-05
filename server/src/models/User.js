import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: null,
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
    role: {
      type: String,
      enum: ["STUDENT", "TEACHER", "ADMIN"],
      default: "STUDENT",
    },
  },
  {
    timestamps: true, // createdAt và updatedAt
  },
);

const User = mongoose.model("User", userSchema);

export default User;
