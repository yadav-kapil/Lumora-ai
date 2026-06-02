import { createClient } from "pexels";
import config from "../../config/config.js";
import ExpressError from "../../utils/ExpressError.js";

const client = createClient(config.STOCK_API_KEY);

export const generateStockImage = async (promptObj) => {
  const { provider, model, size, quality, numberOfImages, prompt, style } = promptObj;

  // Pexels orientation expects: "landscape" | "portrait" | "square"
  const result = await client.photos.search({
    query: prompt,
    orientation: size,
    per_page: 10,
  });

  if (!result.photos || !result.photos.length) {
    throw new ExpressError(500, "No image found for prompt: " + prompt);
  }

  const startIndex = Math.floor(Math.random() * result.photos.length);
  const outputImageUrls = [];

  for (let i = 0; i < numberOfImages; i++) {
    const index = (startIndex + i) % result.photos.length;
    outputImageUrls.push(result.photos[index].src.large2x);
  }

  return {
    outputImageUrls,
    prompt,
    model,
    provider,
    size,
    quality,
    numberOfImages,
    style: style || "realistic",
  };
};
