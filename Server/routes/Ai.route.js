import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getAiInsights } from "../controllers/Ai.controller.js";

const router = express.Router();

router.get("/", protect, getAiInsights);

export default router;
