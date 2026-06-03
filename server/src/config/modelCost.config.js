export const imageDimensions = {
  square: {
    normal: [512, 512],
    hd: [1024, 1024],
    ultra: [2048, 2048],
  },

  portrait: {
    normal: [512, 896],
    hd: [1024, 1792],
    ultra: [2048, 3584],
  },

  landscape: {
    normal: [896, 512],
    hd: [1792, 1024],
    ultra: [3584, 2048],
  },
};

export const generationCost = {
  stock: {
    pexels: {
      square: { normal: 10, hd: 20, ultra: 50 },
      portrait: { normal: 10, hd: 20, ultra: 80 },
      landscape: { normal: 10, hd: 20, ultra: 80 },
    },
  },

  flux: {
    schnell: {
      square: { normal: 10, hd: 15, ultra: 25 },
      portrait: { normal: 10, hd: 20, ultra: 35 },
      landscape: { normal: 10, hd: 20, ultra: 35 },
    },
    dev: {
      square: { normal: 20, hd: 30, ultra: 50 },
      portrait: { normal: 20, hd: 40, ultra: 70 },
      landscape: { normal: 20, hd: 40, ultra: 70 },
    },
  },
};

export const imageToImageCost = {
  flux: {
    "dev/image-to-image": {
      normal: 25,
      hd: 50,
      ultra: 100,
    },
  },

  "nano-banana-2": {
    edit: {
      normal: 15,
      hd: 30,
      ultra: 60,
    },
  },
};