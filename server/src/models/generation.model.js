import mongoose from "mongoose";

const generationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["textToImage", "imageToImage", "imageUpscaler", "removeBG"],
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
      enum: ["square", "portrait", "landscape", ""],
      default: "",
    },

    style: {
      type: String,
      enum: ["realistic", "anime", "3d", "digital", "sketch", ""],
      default: "",
    },

    quality: {
      type: String,
      enum: ["normal", "hd", "ultra", ""],
      default: "",
    },

    numberOfImages: {
      type: Number,
      default: 1,
      min: 1,
      max: 4,
    },

    inputImageUrls: [
      {
        url: {
          type: String,
          required: true,
        },

        publicId: {
          type: String,
          required: true,
        },

        isFavourite: {
          type: Boolean,
          default: false,
        },
      },
    ],

    outputImageUrls: [
      {
        url: {
          type: String,
          required: true,
        },

        publicId: {
          type: String,
          required: true,
        },

        isFavourite: {
          type: Boolean,
          default: false,
        },
      },
    ],


    strength: {
      type: Number,
      default: 0,
    },

    target_resolution: {
      type: Number,
      default: 0,
    },

    creditsUsed: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Generation = mongoose.model("Generation", generationSchema);

export default Generation;
