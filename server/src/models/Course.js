import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    lessons: [{ type: String }],
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    heroImage: { type: String, default: "" },
    shortDescription: { type: String, default: "" },
    description: { type: String, default: "" },
    level: { type: String, default: "Beginner" },
    duration: { type: String, default: "" },
    tags: [{ type: String }],
    price: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
    modules: [moduleSchema],
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;

