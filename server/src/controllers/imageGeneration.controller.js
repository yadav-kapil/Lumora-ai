import { generateStockImage as generateStock } from "../services/text-to-image/generateStock.js";
import { generatePaidModel } from "../services/text-to-image/imageGeneration.service.js";
import wrapAsync from "../utils/wrapAsync.js";
import ExpressError from "../utils/ExpressError.js";
import User from "../models/user.model.js";
import ImageGeneration from "../models/imageGeneration.model.js";
import { getTotalGenerationCost } from "../services/text-to-image/generation.helpers.js";
import cloudinary from "../config/cloudinary.config.js";


// Generate Image
export const generateImage = wrapAsync(async (req, res) => {
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
    result.imageUrls.map((url) =>
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

  // Create ImageGeneration record
  const imageGen = await ImageGeneration.create({
    user: dbUser._id,
    type: "textToImage",
    prompt: result.prompt,
    model: result.model,
    provider: result.provider,
    size: result.size,
    quality: result.quality,
    numberOfImages: result.numberOfImages,
    imageUrls: cloudinaryImages,
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

  const history = await ImageGeneration.find({ user: user._id }).sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    data: history,
  });
});

// Enhance Prompt
export const enhancePrompt = wrapAsync(async (req, res) => {});
