import express from "express";
import { body } from "express-validator";
import {
  createEnrollment,
  getMyEnrollments,
  updateEnrollmentProgress,
} from "../controllers/enrollmentController.js";
import validateRequest from "../middleware/validateRequest.js";
import { protectUser } from "../middleware/userAuthMiddleware.js";

const router = express.Router();

router.get("/me", protectUser, getMyEnrollments);
router.post(
  "/",
  protectUser,
  [body("courseId").notEmpty().withMessage("courseId is required.")],
  validateRequest,
  createEnrollment
);
router.patch("/:id/progress", protectUser, updateEnrollmentProgress);

export default router;

