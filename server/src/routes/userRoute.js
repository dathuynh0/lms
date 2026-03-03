import express from "express";
import { fetchMe } from "../controllers/userController.js";

const router = express.Router();

router.get("/", fetchMe);

export default router;
