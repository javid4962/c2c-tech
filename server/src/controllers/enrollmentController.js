import Assessment from "../models/Assessment.js";
import Certificate from "../models/Certificate.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import asyncHandler from "../utils/asyncHandler.js";

const generateCertificateCode = () => `CERT-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Date.now()}`;

export const createEnrollment = asyncHandler(async (req, res) => {
  const { courseId } = req.body;
  const course = await Course.findById(courseId);

  if (!course || !course.published) {
    res.status(404);
    throw new Error("Course not found.");
  }

  const existing = await Enrollment.findOne({ user: req.user._id, course: course._id });
  if (existing) {
    res.json({ success: true, data: existing });
    return;
  }

  const paymentStatus = course.price > 0 ? "pending" : "not_required";
  const enrollment = await Enrollment.create({
    user: req.user._id,
    course: course._id,
    paymentStatus,
  });

  res.status(201).json({ success: true, data: enrollment });
});

export const getMyEnrollments = asyncHandler(async (req, res) => {
  const enrollments = await Enrollment.find({ user: req.user._id })
    .populate("course")
    .sort({ updatedAt: -1 });
  res.json({ success: true, data: enrollments });
});

export const updateEnrollmentProgress = asyncHandler(async (req, res) => {
  const enrollment = await Enrollment.findOne({ _id: req.params.id, user: req.user._id });
  if (!enrollment) {
    res.status(404);
    throw new Error("Enrollment not found.");
  }

  const progress = Math.max(0, Math.min(100, Number(req.body.progressPercent ?? enrollment.progressPercent)));
  enrollment.progressPercent = progress;

  if (progress >= 100 && enrollment.status !== "completed") {
    enrollment.status = "completed";
    enrollment.completedAt = new Date();

    const assessment = await Assessment.findOne({ course: enrollment.course });
    const passesAssessment = !assessment; // v1: if no assessment configured, allow completion

    if (passesAssessment) {
      await Certificate.updateOne(
        { enrollment: enrollment._id },
        { $setOnInsert: { enrollment: enrollment._id, certificateCode: generateCertificateCode() } },
        { upsert: true }
      );
    }
  }

  const updated = await enrollment.save();
  res.json({ success: true, data: updated });
});

