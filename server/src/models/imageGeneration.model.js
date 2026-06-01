import mongoose from "mongoose";

const imageGenerationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["textToImage"],
      default: "textToImage",
      required: true,
    },

    prompt: {
      type: String,
      required: true,
      trim: true,
    },

    model: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },

    size: {
      type: String,
      enum: ["square", "portrait", "landscape"],
      required: true,
    },

    quality: {
      type: String,
      enum: ["normal", "hd", "ultra"],
      default: "normal",
    },

    numberOfImages: {
      type: Number,
      default: 1,
      min: 1,
      max: 4,
    },

    imageUrls: [
      {
        url: {
          type: String,
          required: true,
        },

        publicId: {
          type: String,
          required: true,
        },
      },
    ],

    creditsUsed: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const ImageGeneration = mongoose.model(
  "ImageGeneration",
  imageGenerationSchema,
);

export default ImageGeneration;
