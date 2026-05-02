import Application from "../models/Application.js";
import Job from "../models/Job.js";
import asyncHandler from "../utils/asyncHandler.js";
import { buildFileUrl } from "../utils/uploadAsset.js";

export const submitApplication = asyncHandler(async (req, res) => {
  const { jobId, fullName, email, phone, linkedin, coverLetter, resume } = req.body;
  const job = await Job.findById(jobId);

  if (!job) {
    res.status(404);
    throw new Error("Job not found.");
  }

  const resumeUrl = req.file ? buildFileUrl(req, req.file.filename) : resume;

  if (!resumeUrl) {
    res.status(422);
    throw new Error("Resume upload is required.");
  }

  const application = await Application.create({
    job: job._id,
    fullName,
    email,
    phone,
    linkedin,
    coverLetter,
    resume: resumeUrl,
  });

  res.status(201).json({
    success: true,
    message: "Application submitted successfully.",
    data: application,
  });
});

export const getApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find()
    .populate("job", "title location department")
    .sort({ createdAt: -1 });
  res.json({ success: true, data: applications });
});

export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (!application) {
    res.status(404);
    throw new Error("Application not found.");
  }

  application.status = req.body.status || application.status;
  const updatedApplication = await application.save();
  res.json({ success: true, data: updatedApplication });
});

