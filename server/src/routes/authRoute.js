import express from "express";
import {
  refreshToken,
  signIn,
  signOut,
  signUp,
} from "../controllers/authController.js";

const router = express.Router();

// signUp
router.post("/signup", signUp);

// signIn
router.post("/signin", signIn);

// signOut
router.post("/signout", signOut);

// refreshToken
router.post("/refresh", refreshToken);

export default router;
