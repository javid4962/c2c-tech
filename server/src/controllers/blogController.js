import Blog from "../models/Blog.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getBlogs = asyncHandler(async (req, res) => {
  const query = {};

  if (req.query.featured === "true") {
    query.isFeatured = true;
  }

  if (req.query.category) {
    query.category = req.query.category;
  }

  const blogs = await Blog.find(query).sort({ publishedAt: -1 });
  res.json({ success: true, data: blogs });
});

export const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found.");
  }

  res.json({ success: true, data: blog });
});

export const createBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.create(req.body);
  res.status(201).json({ success: true, data: blog });
});

export const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found.");
  }

  Object.assign(blog, req.body);
  const updatedBlog = await blog.save();
  res.json({ success: true, data: updatedBlog });
});

export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found.");
  }

  await blog.deleteOne();
  res.json({ success: true, message: "Blog deleted." });
});

