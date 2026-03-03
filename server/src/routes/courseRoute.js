import express from "express";
import {
  getAllCourses,
  createCourse,
  joinCourse,
  deleteCourse,
  deleteMember,
} from "../controllers/courseController.js";

const router = express.Router();

router.get("/", getAllCourses);

router.post("/:id/join", joinCourse);

router.post("/", createCourse);

router.delete("/:id/delete", deleteCourse);

router.delete("/:id/member", deleteMember);

export default router;
