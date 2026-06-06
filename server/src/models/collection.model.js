import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    collectionName: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imagesList: [
      {
        generationId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Generation",
          required: true,
        },
        imageId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure uniqueness of collection name for each user
collectionSchema.index({ user: 1, collectionName: 1 }, { unique: true });

const Collection = mongoose.model("Collection", collectionSchema);
export default Collection;
