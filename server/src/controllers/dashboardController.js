import Application from "../models/Application.js";
import Blog from "../models/Blog.js";
import CaseStudy from "../models/CaseStudy.js";
import Contact from "../models/Contact.js";
import Job from "../models/Job.js";
import Service from "../models/Service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getDashboardMetrics = asyncHandler(async (req, res) => {
  const [services, blogs, jobs, caseStudies, inquiries, applications, recentContacts, recentApplications] =
    await Promise.all([
      Service.countDocuments(),
      Blog.countDocuments(),
      Job.countDocuments({ isActive: true }),
      CaseStudy.countDocuments(),
      Contact.countDocuments(),
      Application.countDocuments(),
      Contact.find().sort({ createdAt: -1 }).limit(5),
      Application.find().populate("job", "title").sort({ createdAt: -1 }).limit(5),
    ]);

  res.json({
    success: true,
    data: {
      totals: { services, blogs, jobs, caseStudies, inquiries, applications },
      recentContacts,
      recentApplications,
    },
  });
});

