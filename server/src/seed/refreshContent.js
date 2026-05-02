import dotenv from "dotenv";
import Blog from "../models/Blog.js";
import CaseStudy from "../models/CaseStudy.js";
import Course from "../models/Course.js";
import Job from "../models/Job.js";
import Service from "../models/Service.js";
import SiteSettings from "../models/SiteSettings.js";
import connectDB from "../config/db.js";
import {
  defaultBlogs,
  defaultCaseStudies,
  defaultCourses,
  defaultJobs,
  defaultServices,
  defaultSettings,
} from "./defaultContent.js";

dotenv.config();

if (!process.argv.includes("--yes")) {
  console.log("Content refresh skipped. Run `npm run content:refresh` to apply the refreshed website defaults.");
  process.exit(0);
}

const legacyTitles = {
  services: [
    "IT Services",
    "Digital Marketing",
    "Staffing (IT/Non-IT)",
    "IT Trainings",
    "Platform Engineering",
    "Cloud, Data, and AI Operations",
    "Growth Marketing and Experience",
    "Talent Solutions and Academies",
  ],
  blogs: [
    "Why enterprise delivery teams are rethinking their operating model in 2026",
    "Training as a growth lever: building stronger technical benches without slowing delivery",
    "How blended staffing models are improving enterprise delivery confidence",
    "Digital marketing operations for enterprise teams: what needs to change first",
  ],
  jobs: ["Senior MERN Stack Engineer", "Digital Marketing Strategist"],
  caseStudies: [
    "Cloud operations redesign for a fast-scaling manufacturing group",
    "Demand engine refresh for a regional healthcare technology brand",
  ],
};

const slugs = (items) => items.map((item) => item.slug).filter(Boolean);

const replaceSeededCollection = async (Model, records, titles = []) => {
  await Model.deleteMany({
    $or: [{ slug: { $in: slugs(records) } }, { title: { $in: titles } }],
  });
  await Model.insertMany(records);
};

const refreshContent = async () => {
  await connectDB();

  const settings = await SiteSettings.findOne();
  if (settings) {
    settings.set(defaultSettings);
    await settings.save();
  } else {
    await SiteSettings.create(defaultSettings);
  }

  await replaceSeededCollection(Service, defaultServices, legacyTitles.services);
  await replaceSeededCollection(Blog, defaultBlogs, legacyTitles.blogs);
  await replaceSeededCollection(Job, defaultJobs, legacyTitles.jobs);
  await replaceSeededCollection(CaseStudy, defaultCaseStudies, legacyTitles.caseStudies);
  await replaceSeededCollection(Course, defaultCourses);

  console.log("Website content refreshed successfully.");
  process.exit(0);
};

refreshContent().catch((error) => {
  console.error(`Content refresh failed: ${error.message}`);
  process.exit(1);
});
