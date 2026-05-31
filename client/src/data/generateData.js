import {
  RiComputerLine,
  RiTabletLine,
  RiSmartphoneLine,
} from "react-icons/ri";


export const STYLES = [
  {
    id: "realistic",
    label: "Realistic",
    img: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=120&h=90&fit=crop",
  },
  {
    id: "anime",
    label: "Anime",
    img: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=120&h=90&fit=crop",
  },
  {
    id: "3d",
    label: "3D Render",
    img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=120&h=90&fit=crop",
  },
  {
    id: "digital",
    label: "Digital Art",
    img: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=120&h=90&fit=crop",
    premium: true,
  },
  {
    id: "sketch",
    label: "Sketch",
    img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=120&h=90&fit=crop",
    premium: true,
  },
];


export const SIZES = [
  {
    id: "square",
    label: "Square",
    previewLabel: "Square (1:1)",
    dims: "1024 × 1024",
    ratio: "1/1",
    previewWidth: "340px",

    indicatorWidth: "18px",
    indicatorHeight: "18px",

    icon: RiTabletLine,
  },

  {
    id: "portrait",
    label: "Portrait",
    previewLabel: "Portrait (9:16)",
    dims: "768 × 1344",
    ratio: "9/16",
    previewWidth: "230px",

    indicatorWidth: "12px",
    indicatorHeight: "22px",

    icon: RiSmartphoneLine,
  },

  {
    id: "landscape",
    label: "Landscape",
    previewLabel: "Landscape (16:9)",
    dims: "1344 × 768",
    ratio: "16/9",
    previewWidth: "100%",

    indicatorWidth: "22px",
    indicatorHeight: "14px",

    icon: RiComputerLine,
  },
];

export const MODELS = [
  { id: "basic", label: "Basic", crown: false, desc: "Fast & efficient" },
  { id: "pro", label: "Pro", crown: true, desc: "Higher quality" },
  { id: "premium", label: "Premium", crown: true, desc: "Best results" },
];

export const RESOLUTIONS = [
  { id: "normal", label: "Normal", crown: false },
  { id: "hd", label: "HD", crown: true },
  { id: "4k", label: "4K", crown: true },
];

export const IMAGE_COUNTS = [
  { id: 1, label: "1 Image", crown: false },
  { id: 2, label: "2 Images", crown: true },
  { id: 4, label: "4 Images", crown: true },
];

export const HISTORY = [
  "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop",
];


