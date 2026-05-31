import { generateStockImage as generateStock } from "../services/text-to-image/generateStock.js";
import { generatePaidModel } from "../services/text-to-image/generateFal.js";
import wrapAsync from "../utils/wrapAsync.js";
import ExpressError from '../utils/ExpressError.js';
import User from "../models/user.model.js";
import ImageGeneration from "../models/imageGeneration.model.js";

export const generateImage = wrapAsync(async (req, res) => {
    const promptObj = req.body.promptObj;
    const provider = promptObj.provider;
    const user = req.user;
    if (!user) {
        throw new ExpressError(401, "Unauthorized");
    }

    const dbUser = await User.findById(user._id);
    if (!dbUser) {
        throw new ExpressError(404, "User not found");
    }

    let result;
    if (provider === 'stock') {
        result = await generateStock(promptObj, dbUser);
    } else {
        result = await generatePaidModel(promptObj, dbUser);
    }

    const updatedUser = await User.findOneAndUpdate(
        {
            _id: dbUser._id,
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
        throw new ExpressError(
            403,
            `Insufficient credits. Required: ${result.cost}, available: ${dbUser.credits}`
        );
    }

    // Create ImageGeneration record
    const imageGen = await ImageGeneration.create({
        user: updatedUser._id,
        prompt: result.prompt,
        model: result.model,
        provider: result.provider,
        aspectRatio: result.size,
        quality: result.quality,
        numberOfImages: result.numberOfImages,
        imageUrls: result.imageUrls,
        creditsUsed: result.cost
    });

    res.status(200).json({
        success: true,
        data: {
            ...result,
            imageGenerationId: imageGen._id,
            creditsRemaining: updatedUser.credits
        }
    });
});
