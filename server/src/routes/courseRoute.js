import express from "express";
import {
  getAllCourses,
  createCourse,
  joinCourse,
  deleteCourse,
  deleteMember,
  getAllCoursesCreatedBy,
} from "../controllers/courseController.js";
import { checkCourseRole } from "../middlewares/courseMiddleware.js";

const router = express.Router();

router.get("/", getAllCourses);

router.get("/createdBy", getAllCoursesCreatedBy);

router.post("/:id/join", joinCourse);

router.post("/", createCourse);

router.delete("/:id/delete", deleteCourse);

router.delete("/:id/member", checkCourseRole, deleteMember);

export default router;
