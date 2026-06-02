export const MODELS = [
    {
    id: "flux-img2img",
    name: "Flux-Dev/Image Edit",
    provider: "flux",
    model: "dev/image-to-image",
    description: "High-fidelity style and detail transformation",
    maxImages: 1
  },
  {
    id: "edit",
    name: "Nano Banana 2/Edit",
    provider: "nano-banana-2",
    model: "edit",
    description: "Fast structure and feature-based edits",
    maxImages: 14
  },
];

export const imageToImageCost = {
  "nano-banana-2": {
    "edit": {
      normal: 15,
      hd: 30,
      ultra: 60,
    },
  },
  "flux": {
    "dev/image-to-image": {
      normal: 25,
      hd: 50,
      ultra: 100,
    },
  },
};
