import express from "express";
import protect from '../middlewares/auth.middleware.js';
import {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
  refreshAccessToken,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/me", protect, getMe);

router.post("/refresh-token", refreshAccessToken);

export default router;
