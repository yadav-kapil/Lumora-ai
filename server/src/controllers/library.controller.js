import Generation from "../models/generation.model.js";
import Collection from "../models/collection.model.js";
import Notification from "../models/notification.model.js";
import ExpressError from "../utils/ExpressError.js";
import wrapAsync from "../utils/wrapAsync.js";

export const addFavourite = wrapAsync(async (req, res) => {
  const { generationId, imageUrl, isFavourite } = req.body;
  const user = req.user;

  if (!user) {
    throw new ExpressError(401, "Unauthorized");
  }

  if (!generationId || !imageUrl) {
    throw new ExpressError(400, "generationId and imageUrl are required");
  }

  // Find the generation document belonging to the authenticated user
  const generation = await Generation.findOne({ _id: generationId, user: user._id });
  if (!generation) {
    throw new ExpressError(404, "Generation item not found or unauthorized");
  }

  let updated = false;

  // Update outputImageUrls
  if (generation.outputImageUrls) {
    generation.outputImageUrls.forEach((img) => {
      if (img.url === imageUrl) {
        img.isFavourite = isFavourite;
        updated = true;
      }
    });
  }

  // Update inputImageUrls
  if (generation.inputImageUrls) {
    generation.inputImageUrls.forEach((img) => {
      if (img.url === imageUrl) {
        img.isFavourite = isFavourite;
        updated = true;
      }
    });
  }

  if (!updated) {
    throw new ExpressError(404, "Image URL not found in this generation record");
  }

  await generation.save();

  res.status(200).json({
    success: true,
    message: isFavourite ? "Marked as favorite successfully" : "Removed from favorites successfully",
  });
});

export const getFavourites = wrapAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ExpressError(401, "Unauthorized");
  }

  const history = await Generation.find({
    user: user._id,
    $or: [
      { "inputImageUrls.isFavourite": true },
      { "outputImageUrls.isFavourite": true },
    ],
  }).sort({ updatedAt: -1 });

  res.status(200).json({
    success: true,
    data: history,
  });
});

export const addToCollection = wrapAsync(async (req, res) => {
  const { collectionName, generationId, imageId } = req.body;
  const user = req.user;

  if (!user) {
    throw new ExpressError(401, "Unauthorized");
  }

  // Handle validation in controller function as requested
  if (!collectionName || !collectionName.trim()) {
    throw new ExpressError(400, "Collection name is required");
  }

  // Find if collection already exists for this user (case-insensitive)
  let collection = await Collection.findOne({
    user: user._id,
    collectionName: { $regex: new RegExp(`^${collectionName.trim()}$`, "i") },
  });

  if (collection) {
    if (generationId && imageId) {
      // Check if image already exists in this collection
      const imageExists = collection.imagesList.some(
        (img) => img.imageId.toString() === imageId && img.generationId.toString() === generationId
      );

      if (!imageExists) {
        collection.imagesList.push({ generationId, imageId });
        await collection.save();
      }
    }
  } else {
    // Create new collection (can be empty)
    const imagesList = (generationId && imageId) ? [{ generationId, imageId }] : [];
    collection = new Collection({
      collectionName: collectionName.trim(),
      user: user._id,
      imagesList,
    });
    await collection.save();
  }

  await collection.populate("imagesList.generationId");

  res.status(200).json({
    success: true,
    message: "Collection updated successfully",
    data: collection,
  });
});

export const getCollections = wrapAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ExpressError(401, "Unauthorized");
  }

  const collections = await Collection.find({ user: user._id })
    .populate("imagesList.generationId")
    .sort({ updatedAt: -1 });

  res.status(200).json({
    success: true,
    data: collections,
  });
});

export const renameCollection = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const { collectionName } = req.body;
  const user = req.user;

  if (!user) {
    throw new ExpressError(401, "Unauthorized");
  }

  if (!collectionName || !collectionName.trim()) {
    throw new ExpressError(400, "Collection name is required");
  }

  const collection = await Collection.findOne({ _id: id, user: user._id });
  if (!collection) {
    throw new ExpressError(404, "Collection not found or unauthorized");
  }

  // Check if another collection already has this name for this user (case-insensitive)
  const nameExists = await Collection.findOne({
    user: user._id,
    _id: { $ne: id },
    collectionName: { $regex: new RegExp(`^${collectionName.trim()}$`, "i") },
  });

  if (nameExists) {
    throw new ExpressError(400, "A collection with this name already exists");
  }

  collection.collectionName = collectionName.trim();
  await collection.save();
  await collection.populate("imagesList.generationId");

  res.status(200).json({
    success: true,
    message: "Collection renamed successfully",
    data: collection,
  });
});

export const deleteCollection = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (!user) {
    throw new ExpressError(401, "Unauthorized");
  }

  const collection = await Collection.findOneAndDelete({ _id: id, user: user._id });
  if (!collection) {
    throw new ExpressError(404, "Collection not found or unauthorized");
  }

  res.status(200).json({
    success: true,
    message: "Collection deleted successfully",
  });
});

export const removeImageFromCollection = wrapAsync(async (req, res) => {
  const { id, imageId } = req.params;
  const user = req.user;

  if (!user) {
    throw new ExpressError(401, "Unauthorized");
  }

  const collection = await Collection.findOne({ _id: id, user: user._id });
  if (!collection) {
    throw new ExpressError(404, "Collection not found or unauthorized");
  }

  collection.imagesList = collection.imagesList.filter(
    (img) => img.imageId.toString() !== imageId
  );

  await collection.save();
  await collection.populate("imagesList.generationId");

  res.status(200).json({
    success: true,
    message: "Image removed from collection successfully",
    data: collection,
  });
});

// Get all notifications
export const getNotifications = wrapAsync(async (req, res) => {
  const notifications = await Notification.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    notifications,
  });
});

// Mark a notification as read/marked for the logged-in user
export const markNotificationRead = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (!user) {
    throw new ExpressError(401, "Unauthorized");
  }

  const notification = await Notification.findById(id);
  if (!notification) {
    throw new ExpressError(404, "Notification not found");
  }

  // Add the user to markByUsers if not already present
  if (!notification.markByUsers.includes(user._id)) {
    notification.markByUsers.push(user._id);
    await notification.save();
  }

  res.status(200).json({
    success: true,
    message: "Notification marked as read",
    notification,
  });
});
