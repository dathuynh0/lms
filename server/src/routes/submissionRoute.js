import express from "express";
import upload from "../config/multer.js";
import {
  editingAssignmentForContent,
  editingAssignmentForFile,
  submitAssignmentForContent,
  submitAssignmentForFile,
} from "../controllers/submissionController.js";

const router = express.Router();

//submit for file
router.post(
  "/:assignmentId/file",
  upload.single("file"),
  submitAssignmentForFile,
);

// submit for content
router.post("/:assignmentId/content", submitAssignmentForContent);

//edit assignment
router.put(
  "/:submissionId/file",
  upload.single("file"),
  editingAssignmentForFile,
);

router.put("/:submissionId/content", editingAssignmentForContent);

export default router;
