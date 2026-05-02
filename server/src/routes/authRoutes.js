import express from "express";
import { body } from "express-validator";
import { getCurrentAdmin, loginAdmin } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("A valid email is required."),
    body("password").notEmpty().withMessage("Password is required."),
  ],
  validateRequest,
  loginAdmin
);
router.get("/me", protect, getCurrentAdmin);

export default router;

