import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    totalImagesGenerated: {
      type: Number,
      default: 0,
    },

    credits: {
      type: Number,
      default: 100,
    },

    plan: {
      type: String,
      enum: ["free", "pro", "premium"],
      default: "free",
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
