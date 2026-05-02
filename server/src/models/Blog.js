import mongoose from "mongoose";
import slugify from "slugify";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    coverImage: { type: String, default: "" },
    author: { type: String, default: "Editorial Team" },
    category: { type: String, default: "Insights" },
    tags: [{ type: String }],
    readTime: { type: String, default: "5 min read" },
    isFeatured: { type: Boolean, default: false },
    publishedAt: { type: Date, default: Date.now },
    seoTitle: { type: String, trim: true },
    seoDescription: { type: String, trim: true },
  },
  { timestamps: true }
);

blogSchema.pre("save", function setSlug(next) {
  if (!this.isModified("title") && this.slug) {
    next();
    return;
  }

  this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;

