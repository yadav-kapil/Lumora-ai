import { chooseModel } from "../services/text-to-image/chooseModel.js";
import wrapAsync from "../utils/wrapAsync.js";
import ImageGeneration from "../models/imageGeneration.model.js";

export const generateImage = wrapAsync(async (req, res) => {
  const promptObj = req.body.promptObj;
  promptObj.userId = req.user._id;

  const fetchImage = chooseModel(promptObj.model);
  const result = await fetchImage(promptObj);

  // Deduct credits and update image count on user
  const updatedUser = await User.findOneAndUpdate(
    {
      _id: result.user._id,
      credits: { $gte: result.cost },
    },
    {
      $inc: {
        credits: -result.cost,
        totalImagesGenerated: 1,
      },
    },
    {
      new: true,
    },
  );

  if (!updatedUser) {
    throw new ExpressError(403, "Insufficient credits");
  }

  // Persist generation record
  const imageGen = await ImageGeneration.create({
    user: updatedUser._id,
    prompt: result.prompt,
    model: result.model,
    aspectRatio: result.size,
    quality: result.quality,
    numberOfImages: result.numberOfImages,
    imageUrls: result.imageUrls,
    creditsUsed: result.cost,
  });

  res.status(200).json({
    success: true,
    data: {
      credits: updatedUser.credits,
      imageUrl: result.imageUrls,
      tokenUsed: result.cost,
      prompt: result.prompt,
      model: result.model,
      size: result.size,
      quality: result.quality,
      numberOfImages: result.numberOfImages,
      imageGenId: imageGen._id,
    },
  });
});
