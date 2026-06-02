import fs from "fs";
import { fal } from "@fal-ai/client";
import {
  getGenerationDimensions,
  getTotalGenerationCost,
} from "./generation.helpers.js";
import ExpressError from "../../utils/ExpressError.js";
import config from "../../config/config.js";
import User from "../../models/user.model.js";
import Generation from "../../models/generation.model.js";
import cloudinary from "../../config/cloudinary.config.js";

fal.config({
  credentials: config.FAL_KEY,
});

const CLIENT_IMAGE_TO_IMAGE_FIELDS = [
  "type",
  "prompt",
  "model",
  "provider",
  "size",
  "style",
  "quality",
  "numberOfImages",
  "strength",
];

const DEFAULT_IMAGE_TO_IMAGE_SIZE = "square";
const DEFAULT_IMAGE_TO_IMAGE_QUALITY = "normal";
const DEFAULT_IMAGE_TO_IMAGE_COUNT = 1;
const DEFAULT_IMAGE_TO_IMAGE_STRENGTH = 0.65;

const toNumber = (value, fallback) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

const pickClientImageToImageFields = (body) =>
  CLIENT_IMAGE_TO_IMAGE_FIELDS.reduce((fields, key) => {
    if (Object.prototype.hasOwnProperty.call(body, key)) {
      fields[key] = body[key];
    }
    return fields;
  }, {});

const normalizeImageToImagePayload = (body = {}) => {
  const payload = pickClientImageToImageFields(body);

  if (Object.prototype.hasOwnProperty.call(payload, "numberOfImages")) {
    payload.numberOfImages = toNumber(
      payload.numberOfImages,
      DEFAULT_IMAGE_TO_IMAGE_COUNT,
    );
  }

  if (Object.prototype.hasOwnProperty.call(payload, "strength")) {
    payload.strength = toNumber(
      payload.strength,
      DEFAULT_IMAGE_TO_IMAGE_STRENGTH,
    );
  }

  return payload;
};

const getRuntimeImageToImageOptions = (payload) => ({
  provider: payload.provider,
  model: payload.model,
  size: payload.size || DEFAULT_IMAGE_TO_IMAGE_SIZE,
  quality: payload.quality || DEFAULT_IMAGE_TO_IMAGE_QUALITY,
  numberOfImages: payload.numberOfImages || DEFAULT_IMAGE_TO_IMAGE_COUNT,
});

const convertFileToBase64DataUri = (file) => {
  let buffer;
  const mimetype = file.mimetype;

  if (file.buffer) {
    buffer = file.buffer;
  } else if (file.path) {
    buffer = fs.readFileSync(file.path);
  } else {
    throw new ExpressError(400, "Unable to read file contents");
  }

  return `data:${mimetype};base64,${buffer.toString("base64")}`;
};

const parseInputImageUrls = (inputImageUrls) => {
  if (!inputImageUrls) {
    return [];
  }

  if (Array.isArray(inputImageUrls)) {
    return inputImageUrls;
  }

  if (typeof inputImageUrls !== "string") {
    return [inputImageUrls];
  }

  try {
    const parsed = JSON.parse(inputImageUrls);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    return [inputImageUrls];
  }
};

const getInputImageUrlsFromRequest = ({ body = {}, files }) => {
  if (!files || Object.keys(files).length === 0) {
    return parseInputImageUrls(body.inputImageUrls);
  }

  return Object.entries(files)
    .filter(([key]) => key.startsWith("file_"))
    .sort(([firstKey], [secondKey]) => {
      const firstIndex = Number(firstKey.replace("file_", ""));
      const secondIndex = Number(secondKey.replace("file_", ""));
      return firstIndex - secondIndex;
    })
    .map(([, file]) => {
      const fileObj = Array.isArray(file) ? file[0] : file;
      return convertFileToBase64DataUri(fileObj);
    });
};

const uploadImagesToCloudinary = async (imageUrls, folder) => {
  const uploadedImages = await Promise.all(
    imageUrls.map((url) => cloudinary.uploader.upload(url, { folder })),
  );

  return uploadedImages.map((image) => ({
    url: image.secure_url,
    publicId: image.public_id,
  }));
};

/**
 * Builds the input parameters expected by Fal.ai endpoints depending on the model/provider
 */
export const buildFalImageToImageInput = (promptObj) => {
  const {
    provider,
    prompt,
    inputImageUrls,
    quality,
    size,
    numberOfImages,
    strength,
  } = promptObj;

  if (provider === "nano-banana-2") {
    return {
      prompt,
      image_urls: inputImageUrls || [],
      num_images: numberOfImages || DEFAULT_IMAGE_TO_IMAGE_COUNT,
      resolution:
        quality === "normal" ? "0.5K" : quality === "hd" ? "1K" : "2K",
      aspect_ratio: "auto",
      output_format: "png",
      safety_tolerance: "4",
      limit_generations: true,
    };
  }

  if (provider === "flux") {
    const { width, height } = getGenerationDimensions({
      size: size || DEFAULT_IMAGE_TO_IMAGE_SIZE,
      quality: quality || DEFAULT_IMAGE_TO_IMAGE_QUALITY,
    });
    return {
      prompt,
      image_url:
        inputImageUrls && inputImageUrls.length > 0 ? inputImageUrls[0] : "",
      strength:
        typeof strength === "number" ? strength : DEFAULT_IMAGE_TO_IMAGE_STRENGTH,
      num_images: numberOfImages || DEFAULT_IMAGE_TO_IMAGE_COUNT,
      image_size: { width, height },
      seed: Math.floor(Math.random() * 1_000_000_000),
    };
  }

  throw new ExpressError(
    400,
    `Unsupported image-to-image provider: ${provider}`,
  );
};

/**
 * Calls Fal.ai image-to-image API and returns standardized outputs
 */
export const generateImageToImageModel = async (promptObj) => {
  const { provider, model } = promptObj;
  const endpoint = `fal-ai/${provider}/${model}`;
  const input = buildFalImageToImageInput({
    ...promptObj,
    ...getRuntimeImageToImageOptions(promptObj),
  });

  let outputImageUrls = [];
  try {
    const result = await fal.subscribe(endpoint, {
      input,
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs?.map((log) => log.message).forEach(console.log);
        }
      },
    });

    if (result.images && result.images.length > 0) {
      outputImageUrls = result.images.map((img) => img.url);
    } else if (result.image) {
      outputImageUrls = [result.image.url];
    } else {
      throw new Error("No image returned from Fal API");
    }
  } catch (apiError) {
    throw new ExpressError(
      500,
      "Paid image-to-image model API generation failed: " + apiError.message,
    );
  }

  return {
    outputImageUrls,
  };
};

export const createImageToImageGeneration = async ({
  requestBody,
  requestFiles,
  user,
}) => {
  if (!user) {
    throw new ExpressError(401, "Unauthorized");
  }

  const clientPayload = normalizeImageToImagePayload(requestBody);
  const runtimeOptions = getRuntimeImageToImageOptions(clientPayload);
  const inputImageUrls = getInputImageUrlsFromRequest({
    body: requestBody,
    files: requestFiles,
  });

  if (inputImageUrls.length === 0) {
    throw new ExpressError(400, "At least one source image is required");
  }

  const cost = getTotalGenerationCost(runtimeOptions);

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
    result = await generateImageToImageModel({
      ...clientPayload,
      ...runtimeOptions,
      inputImageUrls,
    });
  } catch (error) {
    await User.findByIdAndUpdate(user._id, { $inc: { credits: cost } });
    throw error;
  }

  const [cloudinarySources, cloudinaryOutputs] = await Promise.all([
    uploadImagesToCloudinary(
      inputImageUrls,
      "lumora-ai/image-to-image/sources",
    ),
    uploadImagesToCloudinary(result.outputImageUrls, "lumora-ai/image-to-image"),
  ]);

  await User.findByIdAndUpdate(user._id, { $inc: { totalImagesGenerated: 1 } });

  const imageGen = await Generation.create({
    ...clientPayload,
    user: dbUser._id,
    inputImageUrls: cloudinarySources,
    outputImageUrls: cloudinaryOutputs,
    creditsUsed: cost,
  });

  return {
    historyItem: imageGen,
    creditsRemaining: dbUser.credits,
    cost,
  };
};
