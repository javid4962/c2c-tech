import express from "express";
import { body } from "express-validator";
import {
  getContacts,
  submitContact,
  updateContactStatus,
} from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.post(
  "/",
  [
    body("fullName").notEmpty().withMessage("Full name is required."),
    body("email").isEmail().withMessage("A valid email is required."),
    body("message").isLength({ min: 10 }).withMessage("Message should be at least 10 characters."),
  ],
  validateRequest,
  submitContact
);
router.get("/", protect, getContacts);
router.put("/:id/status", protect, updateContactStatus);

export default router;

