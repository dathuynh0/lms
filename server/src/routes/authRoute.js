import express from "express";
import {
  signInController,
  signOutController,
  signUpController,
} from "../controllers/authController.js";

const router = express.Router();

// signUp
router.post("/signup", signUpController);

// signIn
router.post("/signin", signInController);

// signOut
router.post("/signout", signOutController);

export default router;
