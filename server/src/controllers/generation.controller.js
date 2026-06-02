import { generateStockImage as generateStock } from "../services/text-to-image/textToStock.service.js";
import { generatePaidModel } from "../services/text-to-image/textToImage.service.js";
import { createImageToImageGeneration } from "../services/text-to-image/imageToImage.service.js";
import wrapAsync from "../utils/wrapAsync.js";
import ExpressError from "../utils/ExpressError.js";
import User from "../models/user.model.js";
import Generation from "../models/generation.model.js";
import { getTotalGenerationCost } from "../services/text-to-image/generation.helpers.js";
import cloudinary from "../config/cloudinary.config.js";

// Generate Text To Image
export const generateTextToImage = wrapAsync(async (req, res) => {
  const promptObj = req.body.promptObj;
  const user = req.user;

  if (!user) {
    throw new ExpressError(401, "Unauthorized");
  }

  const cost = getTotalGenerationCost({
    provider: promptObj.provider,
    model: promptObj.model,
    size: promptObj.size,
    quality: promptObj.quality,
    numberOfImages: promptObj.numberOfImages,
  });

  // Atomically check and pre-deduct credits
  const dbUser = await User.findOneAndUpdate(
    { _id: user._id, credits: { $gte: cost } },
    { $inc: { credits: -cost } },
    { new: true },
  );

  if (!dbUser) {
    throw new ExpressError(403, "Insufficient credits");
  }

  let result;
  try {
    if (promptObj.provider === "stock") {
      result = await generateStock(promptObj);
    } else {
      result = await generatePaidModel(promptObj);
    }
  } catch (error) {
    // Refund credits on failure
    await User.findByIdAndUpdate(user._id, { $inc: { credits: cost } });
    throw error;
  }

  const uploadedImages = await Promise.all(
    result.outputImageUrls.map((url) =>
      cloudinary.uploader.upload(url, {
        folder: "lumora-ai/text-to-image",
      }),
    ),
  );
  const cloudinaryImages = uploadedImages.map((image) => ({
    url: image.secure_url,
    publicId: image.public_id,
  }));

  // Increment totalImagesGenerated on success
  await User.findByIdAndUpdate(user._id, { $inc: { totalImagesGenerated: 1 } });

  // Create Generation record
  const imageGen = await Generation.create({
    ...promptObj,
    user: dbUser._id,
    type: "textToImage",
    outputImageUrls: cloudinaryImages,
    creditsUsed: cost,
  });

  res.status(201).json({
    success: true,
    data: {
      historyItem: imageGen,
      creditsRemaining: dbUser.credits,
      cost,
    },
  });
});

// Get History
export const getHistory = wrapAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ExpressError(401, "Unauthorized");
  }

  const history = await Generation.find({ user: user._id }).sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    data: history,
  });
});

// Enhance Prompt
export const enhancePrompt = wrapAsync(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Enhance prompt endpoint is not implemented yet.",
  });
});

// Image To Image
export const generateImageToImage = wrapAsync(async (req, res) => {
  const data = await createImageToImageGeneration({
    requestBody: req.body,
    requestFiles: req.files,
    user: req.user,
  });

  res.status(201).json({
    success: true,
    data,
  });
});
