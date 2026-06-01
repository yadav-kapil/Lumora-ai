import {
  generationCost,
  imageDimensions,
} from "../../config/modelCost.config.js";
import ExpressError from "../../utils/ExpressError.js";

export const getTotalGenerationCost = ({
  provider,
  model,
  size,
  quality,
  numberOfImages,
}) => {
  const perImageCost = generationCost?.[provider]?.[model]?.[size]?.[quality];

  if (typeof perImageCost !== "number") {
    throw new ExpressError(
      400,
      "Unsupported provider/model/size/quality combination",
    );
  }

  return perImageCost * numberOfImages;
};

export const getGenerationDimensions = ({ size, quality }) => {
  const dimensions = imageDimensions?.[size]?.[quality];

  if (!dimensions) {
    throw new ExpressError(400, "Invalid size or quality");
  }

  const [width, height] = dimensions;

  return { width, height };
};
