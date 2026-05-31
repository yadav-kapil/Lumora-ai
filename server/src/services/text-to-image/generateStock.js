import { createClient } from "pexels";
import config from "../../config/config.js";
import ExpressError from "../../utils/ExpressError.js";
import { calculateGenerationCost } from "../../utils/calculateCost.js";

const client = createClient(config.STOCK_API_KEY);
const BASE_CREDIT = 10;

export const generateStockImage = async (promptObj, user) => {
  const cost = calculateGenerationCost(BASE_CREDIT, promptObj.size, quality);

  if (promptObj.user.credits < cost) {
    throw new ExpressError(
      403,
      `Insufficient credits. Required: ${cost}, available: ${promptObj.user.credits}`,
    );
  }

  // Pexels orientation expects: "landscape" | "portrait" | "square"
  const result = await client.photos.search({
    query: promptObj.prompt,
    orientation: promptObj.size,
    per_page: 10,
  });

  if (!result.photos || !result.photos.length) {
    throw new ExpressError(
      500,
      "No image found for prompt: " + promptObj.prompt,
    );
  }

  const randomIndex = Math.floor(Math.random() * result.photos.length);
  const imageUrl = result.photos[randomIndex].src.large2x;

  return {
    imageUrls: [imageUrl],
    cost,
    prompt: promptObj.prompt,
    model,
    provider,
    size: promptObj.size,
    quality,
    numberOfImages: promptObj.numberOfImages || 1,
  };
};
