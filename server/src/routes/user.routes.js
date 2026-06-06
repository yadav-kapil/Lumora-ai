import express from "express";
import authenticate from '../middlewares/auth.middleware.js';
import protectCsrf from "../middlewares/csrf.middleware.js";
import { strictLimiter } from "../middlewares/rateLimiter.middleware.js";
import {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
  refreshAccessToken,
  updateProfile,
  updateSetting,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", strictLimiter, registerUser);

router.post("/login", strictLimiter, loginUser);

router.post("/logout", protectCsrf, logoutUser);

router.get("/me", authenticate, getMe);

router.put("/profile", authenticate, updateProfile);

router.put("/setting", authenticate, updateSetting);

router.post("/refresh-token", strictLimiter, protectCsrf, refreshAccessToken);

export default router;
