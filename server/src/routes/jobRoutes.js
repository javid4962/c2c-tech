import express from "express";
import { createJob, deleteJob, getJobBySlug, getJobs, updateJob } from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getJobs).post(protect, createJob);
router.route("/:slug").get(getJobBySlug);
router.route("/id/:id").put(protect, updateJob).delete(protect, deleteJob);

export default router;

