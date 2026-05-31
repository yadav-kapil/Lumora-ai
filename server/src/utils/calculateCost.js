// utils/calculateGenerationCost.js

const IMAGE_DIMENSIONS = {
  square: {
    normal: { width: 512, height: 512 },
    hd: { width: 1024, height: 1024 },
    ultra: { width: 2048, height: 2048 },
  },

  portrait: {
    normal: { width: 512, height: 896 },
    hd: { width: 1024, height: 1792 },
    ultra: { width: 2048, height: 3584 },
  },

  landscape: {
    normal: { width: 896, height: 512 },
    hd: { width: 1792, height: 1024 },
    ultra: { width: 3584, height: 2048 },
  },
};

export const calculateGenerationCost = (baseCredit, aspectRatio, quality) => {
  const dimensions = IMAGE_DIMENSIONS[aspectRatio][quality];

  if (!dimensions) {
    throw new Error("Invalid aspect ratio or quality");
  }

  const megapixels = (dimensions.width * dimensions.height) / 1_000_000;

  const credits = Math.ceil(baseCredit * megapixels);

  return credits;
};
