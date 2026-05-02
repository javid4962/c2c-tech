import express from "express";
import {
  createCaseStudy,
  deleteCaseStudy,
  getCaseStudies,
  getCaseStudyBySlug,
  updateCaseStudy,
} from "../controllers/caseStudyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getCaseStudies).post(protect, createCaseStudy);
router.route("/:slug").get(getCaseStudyBySlug);
router.route("/id/:id").put(protect, updateCaseStudy).delete(protect, deleteCaseStudy);

export default router;

