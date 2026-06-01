import express from "express";
import {
  generateImage,
  getHistory,
  enhancePrompt,
} from "../controllers/imageGeneration.controller.js";
import authenticate from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, generateImage);

router.get("/", authenticate, getHistory);

export default router;
