import express from "express";
const router = express.Router();
import authenticate from "../middleware/authenticate.js";

import {createStory, deleteStory, getStories, getStoriesBySearch, getStoriesByTag, getStoriesByUser,getRelatedStories, getStory, updateStory, likeStory} from "../controllers/story-controller.js";

// endpoints for routing to story controller
router.get("/search", getStoriesBySearch);
router.get("/tag/:tag", getStoriesByTag);
router.post("/relatedStories", getRelatedStories);
router.get("/", getStories);
router.get("/:id", getStory);

router.post("/", authenticate, createStory);
router.delete("/:id", authenticate, deleteStory);
router.patch("/:id", authenticate, updateStory);
router.get("/userStories/:id", authenticate, getStoriesByUser);
router.patch("/like/:id", authenticate, likeStory);

export default router;