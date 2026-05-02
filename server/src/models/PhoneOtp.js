import mongoose from "mongoose";

const phoneOtpSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, index: true },
    name: { type: String, trim: true },
    otpHash: { type: String, required: true },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
    attempts: { type: Number, default: 0 },
    consumedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const PhoneOtp = mongoose.model("PhoneOtp", phoneOtpSchema);

export default PhoneOtp;
