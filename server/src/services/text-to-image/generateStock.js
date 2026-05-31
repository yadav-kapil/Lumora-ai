import { createClient } from "pexels";
import config from "../../config/config.js";
import ExpressError from "../../utils/ExpressError.js";
import { calculateGenerationCost } from "../../utils/calculateCost.js";
import User from "../../models/user.model.js";

const client = createClient(config.STOCK_API_KEY);
const BASE_CREDIT = 10;

export const generateStockImage = async (promptObj) => {
  if (!promptObj.userId) {
    throw new ExpressError(400, "User ID is required");
  }

  const cost = calculateGenerationCost(BASE_CREDIT, promptObj.size, promptObj.quality);

  const user = await User.findById(promptObj.userId);
  if (!user) {
    throw new ExpressError(404, "User not found");
  }
  if (user.credits < cost) {
    throw new ExpressError(
      403,
      `Insufficient credits. Required: ${cost}, available: ${user.credits}`
    );
  }

  // Pexels orientation expects: "landscape" | "portrait" | "square"
  const res = await client.photos.search({
    query: promptObj.prompt,
    orientation: promptObj.size,
    per_page: 1,
  });

  if (!res.photos || !res.photos.length) {
    throw new ExpressError(500, "No image found for prompt: " + promptObj.prompt);
  }

  const imageUrl = res.photos[0].src.large2x;

  // Return all data needed by controller — no DB writes here
  return {
    imageUrls : [imageUrl],
    cost,
    user,                                         // pass user so controller can update credits
    prompt: promptObj.prompt,
    model: promptObj.model,
    size: promptObj.size,
    quality : promptObj.quality,
    numberOfImages: promptObj.numberOfImages || 1,
  };
};