import express from "express";
import { getLearnerDashboard } from "../controllers/learnerDashboardController.js";
import { protectUser } from "../middleware/userAuthMiddleware.js";

const router = express.Router();

router.get("/", protectUser, getLearnerDashboard);

export default router;

