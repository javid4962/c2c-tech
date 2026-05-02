import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    enrollment: { type: mongoose.Schema.Types.ObjectId, ref: "Enrollment", required: true, unique: true },
    issuedAt: { type: Date, default: Date.now },
    certificateCode: { type: String, required: true, unique: true },
    certificateUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

const Certificate = mongoose.model("Certificate", certificateSchema);

export default Certificate;

