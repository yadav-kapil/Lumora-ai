import { generateStockImage as generateStock } from "../services/textToStock.service.js";
import { generatePaidModel } from "../services/textToImage.service.js";
import { generateImageToImageFn } from "../services/imageToImage.service.js";
import { generateRemoveBG } from "../services/removeBG.service.js";
import wrapAsync from "../utils/wrapAsync.js";
import ExpressError from "../utils/ExpressError.js";
import User from "../models/user.model.js";
import Generation from "../models/generation.model.js";
import {
  getImageToImageCost,
  getTotalGenerationCost,
  getUpscaleCost,
  getRemoveBGCost,
} from "../services/generation.helpers.js";
import cloudinary from "../config/cloudinary.config.js";
import { generateUpscaleFn } from "../services/imageUpscale.service.js";

// Generate Text To Image
export const generateTextToImage = wrapAsync(async (req, res) => {
  const promptObj = { ...req.body };
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
  const promptObj = { ...req.body };

  const user = req.user;
  if (!user) {
    throw new ExpressError(401, "Unauthorized");
  }
  const cost = getImageToImageCost({
    provider: promptObj.provider,
    model: promptObj.model,
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

  const files = req.files;
  const uploadedImages = await Promise.all(
    files.map((file) => {
      return new Promise((resolve, reject) =>
        cloudinary.uploader
          .upload_stream(
            {
              folder: "lumora-ai/image-to-image-input",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          )
          .end(file.buffer),
      );
    }),
  );
  promptObj.inputImageUrls = uploadedImages.map((url) => url.secure_url);

  let result;
  try {
    result = await generateImageToImageFn(promptObj);
  } catch (error) {
    // Refund credits on failure
    await User.findByIdAndUpdate(user._id, { $inc: { credits: cost } });
    throw error;
  }

  // Upload output files to Cloudinary
  const uploadedOutputs = await Promise.all(
    result.outputImageUrls.map((url) =>
      cloudinary.uploader.upload(url, {
        folder: "lumora-ai/image-to-image-output",
      }),
    ),
  );
  const cloudinaryOutputs = uploadedOutputs.map((image) => ({
    url: image.secure_url,
    publicId: image.public_id,
  }));

  // Increment totalImagesGenerated on success
  await User.findByIdAndUpdate(user._id, { $inc: { totalImagesGenerated: 1 } });

  // Create Generation record
  const imageGen = await Generation.create({
    ...promptObj,
    user: dbUser._id,
    type: "imageToImage",
    inputImageUrls: uploadedImages.map((image) => ({
      url: image.secure_url,
      publicId: image.public_id,
    })),
    outputImageUrls: cloudinaryOutputs,
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


// <------  Image Upscale --------> 
export const imageUpscale = wrapAsync(async (req, res) => {
  const promptObj = { ...req.body };

  const user = req.user;
  if (!user) {
    throw new ExpressError(401, "Unauthorized");
  }
  const cost = getUpscaleCost(promptObj.target_resolution);

  // Atomically check and pre-deduct credits
  const dbUser = await User.findOneAndUpdate(
    { _id: user._id, credits: { $gte: cost } },
    { $inc: { credits: -cost } },
    { new: true },
  );

  if (!dbUser) {
    throw new ExpressError(403, "Insufficient credits");
  }

  const files = [req.file];
  const uploadedImages = await Promise.all(
    files.map((file) => {
      return new Promise((resolve, reject) =>
        cloudinary.uploader
          .upload_stream(
            {
              folder: "lumora-ai/upScale-input",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          )
          .end(file.buffer),
      );
    }),
  );
  promptObj.inputImageUrls = uploadedImages.map((url) => url.secure_url);

  let result;
  try {
    result = await generateUpscaleFn(promptObj);
  } catch (error) {
    await User.findByIdAndUpdate(user._id, { $inc: { credits: cost } });
    throw error;
  }


  // Upload output files to Cloudinary
  const uploadedOutputs = await Promise.all(
    result.outputImageUrls.map((url) =>
      cloudinary.uploader.upload(url, {
        folder: "lumora-ai/upScale-output",
      }),
    ),
  );
  const cloudinaryOutputs = uploadedOutputs.map((image) => ({
    url: image.secure_url,
    publicId: image.public_id,
  }));

  // Increment totalImagesGenerated on success
  await User.findByIdAndUpdate(user._id, { $inc: { totalImagesGenerated: 1 } });

  // Create Generation record
  const imageGen = await Generation.create({
    ...promptObj,
    user: dbUser._id,
    type: "imageUpscaler",
    inputImageUrls: uploadedImages.map((image) => ({
      url: image.secure_url,
      publicId: image.public_id,
    })),
    outputImageUrls: cloudinaryOutputs,
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

})

// < ------ REMOVE BG ----- >
export const removeBackground = wrapAsync(async (req, res) => {
  const promptObj = { ...req.body };

  const user = req.user;
  if (!user) {
    throw new ExpressError(401, "Unauthorized");
  }
  const cost = getRemoveBGCost();

  // Atomically check and pre-deduct credits
  const dbUser = await User.findOneAndUpdate(
    { _id: user._id, credits: { $gte: cost } },
    { $inc: { credits: -cost } },
    { new: true },
  );

  if (!dbUser) {
    throw new ExpressError(403, "Insufficient credits");
  }

  const files = [req.file];
  const uploadedImages = await Promise.all(
    files.map((file) => {
      return new Promise((resolve, reject) =>
        cloudinary.uploader
          .upload_stream(
            {
              folder: "lumora-ai/removeBG-input",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          )
          .end(file.buffer),
      );
    }),
  );
  promptObj.inputImageUrls = uploadedImages.map((url) => url.secure_url);

  let result;
  try {
    result = await generateRemoveBG(promptObj);
  } catch (error) {
    await User.findByIdAndUpdate(user._id, { $inc: { credits: cost } });
    throw error;
  }

  // Upload output files to Cloudinary
  const uploadedOutputs = await Promise.all(
    result.outputImageUrls.map((url) =>
      cloudinary.uploader.upload(url, {
        folder: "lumora-ai/removeBG-output",
      }),
    ),
  );
  const cloudinaryOutputs = uploadedOutputs.map((image) => ({
    url: image.secure_url,
    publicId: image.public_id,
  }));

  // Increment totalImagesGenerated on success
  await User.findByIdAndUpdate(user._id, { $inc: { totalImagesGenerated: 1 } });

  // Create Generation record
  const imageGen = await Generation.create({
    ...promptObj,
    user: dbUser._id,
    type: "removeBG",
    inputImageUrls: uploadedImages.map((image) => ({
      url: image.secure_url,
      publicId: image.public_id,
    })),
    outputImageUrls: cloudinaryOutputs,
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