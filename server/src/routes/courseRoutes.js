import express from "express";
import { getCourseBySlug, getCourses } from "../controllers/courseController.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/:slug", getCourseBySlug);

export default router;

