import AdminUser from "../models/AdminUser.js";
import Blog from "../models/Blog.js";
import CaseStudy from "../models/CaseStudy.js";
import Course from "../models/Course.js";
import Job from "../models/Job.js";
import Service from "../models/Service.js";
import SiteSettings from "../models/SiteSettings.js";
import {
  defaultBlogs,
  defaultCaseStudies,
  defaultCourses,
  defaultJobs,
  defaultServices,
  defaultSettings,
} from "../seed/defaultContent.js";

const ensureDefaults = async () => {
  const [settingsCount, servicesCount, blogsCount, jobsCount, caseStudyCount, courseCount] =
    await Promise.all([
      SiteSettings.countDocuments(),
      Service.countDocuments(),
      Blog.countDocuments(),
      Job.countDocuments(),
      CaseStudy.countDocuments(),
      Course.countDocuments(),
    ]);

  if (!settingsCount) {
    await SiteSettings.create(defaultSettings);
  }

  if (!servicesCount) {
    await Service.insertMany(defaultServices);
  }

  if (!blogsCount) {
    await Blog.insertMany(defaultBlogs);
  }

  if (!jobsCount) {
    await Job.insertMany(defaultJobs);
  }

  if (!caseStudyCount) {
    await CaseStudy.insertMany(defaultCaseStudies);
  }

  if (!courseCount) {
    await Course.insertMany(defaultCourses);
  }

  const adminEmail = process.env.ADMIN_EMAIL || "admin@c2ctech.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin@123";
  const adminExists = await AdminUser.findOne({ email: adminEmail.toLowerCase() });

  if (!adminExists) {
    await AdminUser.create({
      name: "C2C Administrator",
      email: adminEmail,
      password: adminPassword,
    });
  }
};

export default ensureDefaults;

