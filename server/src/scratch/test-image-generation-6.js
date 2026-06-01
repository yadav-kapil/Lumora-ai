import connectDB from "../config/db.js";
import { generateImage } from "../controllers/imageGeneration.controller.js";
import User from "../models/user.model.js";
import ImageGeneration from "../models/imageGeneration.model.js";
import mongoose from "mongoose";

// A small mock response helper for Express res
const mockResponse = () => {
  const res = {};
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (data) => {
    res.body = data;
    return res;
  };
  return res;
};

const test = async () => {
  await connectDB();
  console.log("Connected to DB");

  // Get or create test user
  let user = await User.findOne();
  if (!user) {
    user = await User.create({
      username: "testuser",
      email: "testuser@gmail.com",
      password: "hashedpassword123",
      credits: 20
    });
  } else {
    user.credits = 20;
    await user.save();
  }
  console.log("User starting credits:", user.credits);

  // Define mock req (cost will be 10 for normal square stock)
  const req = {
    user: user,
    body: {
      promptObj: {
        prompt: "A beautiful garden in spring, butterflies",
        model: "pexels",
        provider: "stock",
        size: "square",
        quality: "normal",
        numberOfImages: 1
      }
    }
  };

  const res = mockResponse();

  try {
    console.log("\n--- Dispatching via Controller generateImage (Stock) ---");
    // Call controller generateImage directly
    await generateImage(req, res, (err) => {
      if (err) throw err;
    });

    console.log("Response Status Code:", res.statusCode);
    console.log("Response Body:", JSON.stringify(res.body, null, 2));

    // Verify DB states after controller run
    const updatedUser = await User.findById(user._id);
    console.log("Updated User credits:", updatedUser.credits);
    console.log("Updated User totalImagesGenerated:", updatedUser.totalImagesGenerated);

    const dbRecord = await ImageGeneration.findOne({ user: user._id }).sort({ createdAt: -1 });
    console.log("Latest ImageGeneration entry details:");
    console.log("- prompt:", dbRecord.prompt);
    console.log("- imageUrls:", dbRecord.imageUrls);
    console.log("- creditsUsed:", dbRecord.creditsUsed);

  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from DB");
  }
};

test();
