import express from "express";
import { body } from "express-validator";
import {
  adminCreateCourse,
  adminDeleteCourse,
  adminUpdateCourse,
} from "../controllers/courseController.js";
import { protect } from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.post(
  "/",
  protect,
  [body("title").notEmpty().withMessage("Title is required.")],
  validateRequest,
  adminCreateCourse
);
router.put("/:id", protect, adminUpdateCourse);
router.delete("/:id", protect, adminDeleteCourse);

export default router;

