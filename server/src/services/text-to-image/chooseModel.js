import { generateStockImage } from "./generateStock.js";
import ExpressError from '../../utils/ExpressError.js';


const imageGenerationModels = {
  stock: generateStockImage,
};

export const chooseModel = (model) => {
  const generator = imageGenerationModels[model];

  if (!generator) {
    throw new ExpressError(400, `Unsupported model: ${model}`);
  }

  return generator;
};