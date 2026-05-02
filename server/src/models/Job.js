import mongoose from "mongoose";
import slugify from "slugify";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    summary: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    type: { type: String, default: "Full Time" },
    experience: { type: String, default: "3+ years" },
    department: { type: String, default: "Technology" },
    description: { type: String, required: true },
    responsibilities: [{ type: String }],
    qualifications: [{ type: String }],
    isActive: { type: Boolean, default: true },
    postedAt: { type: Date, default: Date.now },
    seoTitle: { type: String, trim: true },
    seoDescription: { type: String, trim: true },
  },
  { timestamps: true }
);

jobSchema.pre("save", function setSlug(next) {
  if (!this.isModified("title") && this.slug) {
    next();
    return;
  }

  this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

const Job = mongoose.model("Job", jobSchema);

export default Job;

