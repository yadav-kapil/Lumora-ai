import express from "express";
import multer from "multer";
import {
  generateTextToImage,
  generateImageToImage,
  getHistory,
  enhancePrompt,
} from "../controllers/generation.controller.js";
import authenticate from "../middlewares/auth.middleware.js";

const router = express.Router();
const upload = multer();

router.post("/text-to-image", authenticate, upload.any(), generateTextToImage);
router.post(
  "/image-to-image",
  authenticate,
  upload.array("inputImages", 14),
  generateImageToImage,
);
router.post(
  "/upscale",
  authenticate,
  upload.single("inputImage", 1),
  generateImageToImage,
);
router.get("/history", authenticate, getHistory);
router.post("/enhance", authenticate, enhancePrompt);

export default router;
