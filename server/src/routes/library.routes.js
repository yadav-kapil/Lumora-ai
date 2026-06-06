import express from "express";
import { addFavourite, getFavourites, addToCollection, getCollections, renameCollection, deleteCollection, removeImageFromCollection, getNotifications, markNotificationRead } from "../controllers/library.controller.js";
import authenticate from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/favourites", authenticate, addFavourite);
router.get("/favourites", authenticate, getFavourites);
router.post("/collection", authenticate, addToCollection);
router.get("/collection", authenticate, getCollections);
router.patch("/collection/:id", authenticate, renameCollection);
router.delete("/collection/:id", authenticate, deleteCollection);
router.delete("/collection/:id/image/:imageId", authenticate, removeImageFromCollection);
router.get("/notification", authenticate, getNotifications);
router.put("/notification/:id/read", authenticate, markNotificationRead);

export default router;
