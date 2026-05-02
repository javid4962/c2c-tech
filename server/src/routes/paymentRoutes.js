import express from "express";
import { body } from "express-validator";
import { createPaymentIntent } from "../controllers/paymentController.js";
import validateRequest from "../middleware/validateRequest.js";
import { protectUser } from "../middleware/userAuthMiddleware.js";

const router = express.Router();

router.post(
  "/create-intent",
  protectUser,
  [body("enrollmentId").notEmpty().withMessage("enrollmentId is required.")],
  validateRequest,
  createPaymentIntent
);

export default router;

