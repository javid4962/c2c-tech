import mongoose from "mongoose";
import slugify from "slugify";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    shortDescription: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    icon: { type: String, default: "MonitorCog" },
    image: { type: String, default: "" },
    highlights: [{ type: String }],
    process: [{ type: String }],
    industryFocus: [{ type: String }],
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    seoTitle: { type: String, trim: true },
    seoDescription: { type: String, trim: true },
  },
  { timestamps: true }
);

serviceSchema.pre("save", function setSlug(next) {
  if (!this.isModified("title") && this.slug) {
    next();
    return;
  }

  this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

const Service = mongoose.model("Service", serviceSchema);

export default Service;

