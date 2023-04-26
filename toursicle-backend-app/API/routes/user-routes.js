import express from "express";
const router = express.Router();

import {signup, signin, verify} from "../controllers/user-controller.js";

// endpoints for routing to user controller
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/verify/:id", verify);

export default router;