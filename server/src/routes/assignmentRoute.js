import express from "express";
import {
  createAssignment,
  getAllAssignmentsForCourse,
  updateAssignment,
  togglePublicAssignment,
  deleteAssignment,
} from "../controllers/assignmentController.js";
import {
  checkCourseMembership,
  checkCourseRole,
} from "../middlewares/courseMiddleware.js";

const router = express.Router();

router.get("/:id", checkCourseMembership, getAllAssignmentsForCourse);

// TEACHER
router.post("/:id", checkCourseRole, createAssignment);

router.put("/:id/update/:assignmentId", checkCourseRole, updateAssignment);

router.put(
  "/:id/public/:assignmentId",
  checkCourseRole,
  togglePublicAssignment,
);

router.delete("/:id/delete/:assignmentId", checkCourseRole, deleteAssignment);

export default router;
