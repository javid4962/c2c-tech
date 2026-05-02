import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true, index: true },
    status: { type: String, default: "active" }, // active | completed | cancelled
    progressPercent: { type: Number, default: 0, min: 0, max: 100 },
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date, default: null },
    paymentStatus: { type: String, default: "not_required" }, // not_required | pending | paid | failed
  },
  { timestamps: true }
);

enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

export default Enrollment;

