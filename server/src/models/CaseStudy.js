import mongoose from "mongoose";
import slugify from "slugify";

const metricSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

const caseStudySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    client: { type: String, required: true, trim: true },
    industry: { type: String, required: true, trim: true },
    summary: { type: String, required: true, trim: true },
    challenge: { type: String, required: true },
    solution: { type: String, required: true },
    outcome: { type: String, required: true },
    metrics: [metricSchema],
    services: [{ type: String }],
    tags: [{ type: String }],
    coverImage: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    seoTitle: { type: String, trim: true },
    seoDescription: { type: String, trim: true },
  },
  { timestamps: true }
);

caseStudySchema.pre("save", function setSlug(next) {
  if (!this.isModified("title") && this.slug) {
    next();
    return;
  }

  this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

const CaseStudy = mongoose.model("CaseStudy", caseStudySchema);

export default CaseStudy;

