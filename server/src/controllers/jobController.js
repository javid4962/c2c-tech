import Job from "../models/Job.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getJobs = asyncHandler(async (req, res) => {
  const query = {};

  if (req.query.active === "true") {
    query.isActive = true;
  }

  const jobs = await Job.find(query).sort({ postedAt: -1 });
  res.json({ success: true, data: jobs });
});

export const getJobBySlug = asyncHandler(async (req, res) => {
  const job = await Job.findOne({ slug: req.params.slug });

  if (!job) {
    res.status(404);
    throw new Error("Job not found.");
  }

  res.json({ success: true, data: job });
});

export const createJob = asyncHandler(async (req, res) => {
  const job = await Job.create(req.body);
  res.status(201).json({ success: true, data: job });
});

export const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error("Job not found.");
  }

  Object.assign(job, req.body);
  const updatedJob = await job.save();
  res.json({ success: true, data: updatedJob });
});

export const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error("Job not found.");
  }

  await job.deleteOne();
  res.json({ success: true, message: "Job deleted." });
});

