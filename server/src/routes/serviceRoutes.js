import express from "express";
import {
  createService,
  deleteService,
  getServiceBySlug,
  getServices,
  updateService,
} from "../controllers/serviceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getServices).post(protect, createService);
router.route("/:slug").get(getServiceBySlug);
router.route("/id/:id").put(protect, updateService).delete(protect, deleteService);

export default router;

