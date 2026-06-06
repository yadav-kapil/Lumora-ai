import { fal } from "@fal-ai/client";
import ExpressError from "../utils/ExpressError.js";
import config from "../config/config.js";

fal.config({
  credentials: config.FAL_KEY,
});

export const generateUpscaleFn = async (promptObj) => {
  const { provider, model, target_resolution, inputImageUrls, noise } =
    promptObj;
  const endpoint = `fal-ai/${provider}/${model}`;

  let outputImageUrls = [];
  try {
    const result = await fal.subscribe(endpoint, {
      input: {
        image_url: inputImageUrls[0],
        upscale_mode: "target",
        upscale_factor: 2,
        target_resolution: target_resolution,
        noise_scale: noise,
        output_format: "png",
      },
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
