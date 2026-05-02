import express from "express";
import {
  createBlog,
  deleteBlog,
  getBlogBySlug,
  getBlogs,
  updateBlog,
} from "../controllers/blogController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getBlogs).post(protect, createBlog);
router.route("/:slug").get(getBlogBySlug);
router.route("/id/:id").put(protect, updateBlog).delete(protect, deleteBlog);

export default router;

