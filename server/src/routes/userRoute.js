import express from "express";
import { fetchMeController } from "../controllers/userController.js";

const router = express.Router();

router.get("/", fetchMeController);

export default router;
