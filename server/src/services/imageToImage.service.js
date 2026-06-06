import { fal } from "@fal-ai/client";
import ExpressError from "../utils/ExpressError.js";
import config from "../config/config.js";

fal.config({
  credentials: config.FAL_KEY,
});

// Helper function to build the input payload for Fal.ai according to model/provider
export const buildFalImageToImageInput = (promptObj) => {
  const {
    provider,
    prompt,
    quality,
    numberOfImages,
    strength,
    inputImageUrls,
  } = promptObj;

  if (provider === "nano-banana-2") {
    return {
      prompt,
      image_urls: inputImageUrls || [],
      num_images: numberOfImages,
      resolution: quality === "ultra" ? "2K" : quality === "hd" ? "1K" : "0.5K",
      output_format: "png",
      safety_tolerance: "4",
      limit_generations: true,
    };
  }

  if (provider === "flux") {
    return {
      prompt,
      image_url: inputImageUrls[0],
      strength,
      num_images: numberOfImages,
      seed: Math.floor(Math.random() * 1_000_000_000),
    };
  }

  throw new ExpressError(
    400,
    `Unsupported image-to-image provider: ${provider}`,
  );
};

export const generateImageToImageFn = async (promptObj) => {
  const { provider, model } = promptObj;
  const endpoint = `fal-ai/${provider}/${model}`;

  const input = buildFalImageToImageInput(promptObj);

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
    ...promptObj,
  };
};
