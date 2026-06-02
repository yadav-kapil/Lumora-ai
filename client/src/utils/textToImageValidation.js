import { generationCost } from "../data/generateData";

export const validateTextToImage = (promptObj, currentCredits) => {
  const errors = {};

  const providerCost = generationCost[promptObj.provider]?.[promptObj.model]?.[promptObj.size]?.[promptObj.quality] || 0;
  const creditRequired = providerCost * promptObj.numberOfImages;

  if (currentCredits < creditRequired) {
    errors.credits = "Insufficient credits. Please upgrade your plan or purchase more credits.";
  }

  return errors;
};
