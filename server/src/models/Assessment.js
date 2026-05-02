import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    prompt: { type: String, required: true },
    options: [{ type: String }],
    correctIndex: { type: Number, default: 0 },
  },
  { _id: false }
);

const assessmentSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true, unique: true },
    title: { type: String, default: "Course Assessment" },
    passMark: { type: Number, default: 60 },
    questions: [questionSchema],
  },
  { timestamps: true }
);

const Assessment = mongoose.model("Assessment", assessmentSchema);

export default Assessment;

