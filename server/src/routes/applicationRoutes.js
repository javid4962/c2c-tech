import express from "express";
import { body } from "express-validator";
import {
  getApplications,
  submitApplication,
  updateApplicationStatus,
} from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.post(
  "/",
  upload.single("resumeFile"),
  [
    body("jobId").notEmpty().withMessage("Job selection is required."),
    body("fullName").notEmpty().withMessage("Full name is required."),
    body("email").isEmail().withMessage("A valid email is required."),
  ],
  validateRequest,
  submitApplication
);
router.get("/", protect, getApplications);
router.put("/:id/status", protect, updateApplicationStatus);

export default router;

