import { fal } from "@fal-ai/client";
import { getDimensions, calculateGenerationCost } from "../../utils/calculateCost.js";
import ExpressError from "../../utils/ExpressError.js";

const BASE_COST = [
  {
    provider: "flux",
    model: "schnell",
    cost: 30,
  },
];

const getBaseCost = (provider, model) => {
  const modelCost = BASE_COST.find(
    (baseCost) => baseCost.provider === provider && baseCost.model === model,
  );
  if (!modelCost) {
    throw new ExpressError(400, "Unsupported Fal model: " + `${provider}/${model}`);
  }
  return modelCost.cost;
};

export const generatePaidModel = async (promptObj, user) => {
  const provider = promptObj.provider || "flux";
  const model = promptObj.model || "schnell";
  const quality = promptObj.quality || "normal";

  const cost = calculateGenerationCost(getBaseCost(provider, model), promptObj.size, quality);

  if (user.credits < cost) {
    throw new ExpressError(
      403,
      `Insufficient credits. Required: ${cost}, available: ${user.credits}`,
    );
  }

  const { width, height } = getDimensions(promptObj.size, quality);

  let imageUrls;
  try {
    const result = await fal.subscribe(`fal-ai/${provider}/${model}`, {
      input: {
        prompt: promptObj.prompt,
        image_size: {
          width,
          height,
        },
        num_images: promptObj.numberOfImages || 1,
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
    imageUrls = result.images.map(img => img.url);
  } catch (apiError) {
    throw new ExpressError(500, "Paid model API generation failed: " + apiError.message);
  }

  return {
    imageUrls,
    cost,
    prompt: promptObj.prompt,
    model,
    provider,
    size: promptObj.size,
    quality,
    numberOfImages: promptObj.numberOfImages || 1
  };
};
