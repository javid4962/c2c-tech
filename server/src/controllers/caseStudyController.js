import CaseStudy from "../models/CaseStudy.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getCaseStudies = asyncHandler(async (req, res) => {
  const query = {};

  if (req.query.featured === "true") {
    query.featured = true;
  }

  if (req.query.industry) {
    query.industry = req.query.industry;
  }

  const caseStudies = await CaseStudy.find(query).sort({ createdAt: -1 });
  res.json({ success: true, data: caseStudies });
});

export const getCaseStudyBySlug = asyncHandler(async (req, res) => {
  const caseStudy = await CaseStudy.findOne({ slug: req.params.slug });

  if (!caseStudy) {
    res.status(404);
    throw new Error("Case study not found.");
  }

  res.json({ success: true, data: caseStudy });
});

export const createCaseStudy = asyncHandler(async (req, res) => {
  const caseStudy = await CaseStudy.create(req.body);
  res.status(201).json({ success: true, data: caseStudy });
});

export const updateCaseStudy = asyncHandler(async (req, res) => {
  const caseStudy = await CaseStudy.findById(req.params.id);

  if (!caseStudy) {
    res.status(404);
    throw new Error("Case study not found.");
  }

  Object.assign(caseStudy, req.body);
  const updatedCaseStudy = await caseStudy.save();
  res.json({ success: true, data: updatedCaseStudy });
});

export const deleteCaseStudy = asyncHandler(async (req, res) => {
  const caseStudy = await CaseStudy.findById(req.params.id);

  if (!caseStudy) {
    res.status(404);
    throw new Error("Case study not found.");
  }

  await caseStudy.deleteOne();
  res.json({ success: true, message: "Case study deleted." });
});

