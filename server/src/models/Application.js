import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    coverLetter: { type: String, trim: true },
    resume: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "reviewing", "shortlisted", "rejected"],
      default: "new",
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;

