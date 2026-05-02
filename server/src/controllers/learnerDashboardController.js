import Certificate from "../models/Certificate.js";
import Enrollment from "../models/Enrollment.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getLearnerDashboard = asyncHandler(async (req, res) => {
  const enrollments = await Enrollment.find({ user: req.user._id })
    .populate("course")
    .sort({ updatedAt: -1 });

  const completedEnrollmentIds = enrollments.filter((e) => e.status === "completed").map((e) => e._id);
  const certificates = completedEnrollmentIds.length
    ? await Certificate.find({ enrollment: { $in: completedEnrollmentIds } })
    : [];

  const stats = {
    enrolled: enrollments.length,
    active: enrollments.filter((e) => e.status === "active").length,
    completed: enrollments.filter((e) => e.status === "completed").length,
    averageProgress:
      enrollments.length === 0
        ? 0
        : Math.round(enrollments.reduce((sum, e) => sum + (e.progressPercent || 0), 0) / enrollments.length),
  };

  res.json({ success: true, data: { stats, enrollments, certificates } });
});

