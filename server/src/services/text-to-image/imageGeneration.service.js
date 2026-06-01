import { fal } from "@fal-ai/client";
import {
  getGenerationDimensions,
} from "./generation.helpers.js";
import ExpressError from "../../utils/ExpressError.js";
import config from "../../config/config.js";

fal.config({
  credentials: config.FAL_KEY,
});

export const generatePaidModel = async (promptObj) => {
  const { provider, model, size, quality, numberOfImages, prompt } =
    promptObj;
  const { width, height } = getGenerationDimensions({ size, quality });

  let imageUrls;
  try {
    const result = await fal.subscribe(`fal-ai/${provider}/${model}`, {
      input: {
        prompt,
        image_size: {
          width,
          height,
        },
        num_images: numberOfImages,
        seed: Math.floor(Math.random() * 1_000_000_000),
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs?.map((log) => log.message).forEach(console.log);
        }
      },
    });

    if (!result || !result.images || result.images.length === 0) {
      throw new Error("No image returned from Fal API");
    }
    imageUrls = result.images.map((img) => img.url);
  } catch (apiError) {
    throw new ExpressError(
      500,
      "Paid model API generation failed : " + apiError.message,
    );
  }


  return {
    imageUrls,
    prompt,
    model,
    provider,
    size,
    quality,
    numberOfImages,
  };
};
