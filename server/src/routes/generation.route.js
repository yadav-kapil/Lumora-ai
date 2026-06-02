import express from "express";
import {
  generateTextToImage,
  generateImageToImage,
  getHistory,
  enhancePrompt,
} from "../controllers/generation.controller.js";
import authenticate from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/text-to-image", authenticate, generateTextToImage);
router.post("/image-to-image", authenticate, generateImageToImage);
router.get("/history", authenticate, getHistory);
router.post("/enhance", authenticate, enhancePrompt);

export default router;
