import { imageToImageCost } from "../data/imageToImageData";

export const validateImageToImage = (provider, model, quality, numberOfImages, currentCredits) => {
  const errors = {};

  const costPerImage = imageToImageCost[provider]?.[model]?.[quality] || 0;
  const totalCost = costPerImage * numberOfImages;

  if (currentCredits < totalCost) {
    errors.credits = "Insufficient credits. Please upgrade your plan or purchase more credits.";
  }

  return errors;
};
