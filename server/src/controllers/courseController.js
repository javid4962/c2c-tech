import Course from "../models/Course.js";
import asyncHandler from "../utils/asyncHandler.js";
import slugify from "../utils/slugify.js";

export const getCourses = asyncHandler(async (req, res) => {
  const query = { published: true };
  const { q, tag, level } = req.query;

  if (level) query.level = level;
  if (tag) query.tags = tag;
  if (q) query.title = { $regex: q, $options: "i" };

  const courses = await Course.find(query).sort({ createdAt: -1 });
  res.json({ success: true, data: courses });
});

export const getCourseBySlug = asyncHandler(async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug, published: true });
  if (!course) {
    res.status(404);
    throw new Error("Course not found.");
  }
  res.json({ success: true, data: course });
});

export const adminCreateCourse = asyncHandler(async (req, res) => {
  const payload = { ...req.body };
  if (!payload.slug && payload.title) payload.slug = slugify(payload.title);
  const course = await Course.create(payload);
  res.status(201).json({ success: true, data: course });
});

export const adminUpdateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    res.status(404);
    throw new Error("Course not found.");
  }

  course.set(req.body);
  if (!course.slug && course.title) course.slug = slugify(course.title);
  const updated = await course.save();
  res.json({ success: true, data: updated });
});

export const adminDeleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    res.status(404);
    throw new Error("Course not found.");
  }

  await course.deleteOne();
  res.json({ success: true });
});

