import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createPaymentIntent = asyncHandler(async (req, res) => {
  const { enrollmentId } = req.body;

  const enrollment = await Enrollment.findOne({ _id: enrollmentId, user: req.user._id }).populate("course");
  if (!enrollment) {
    res.status(404);
    throw new Error("Enrollment not found.");
  }

  const course = enrollment.course;
  if (!course) {
    res.status(400);
    throw new Error("Enrollment is missing course.");
  }

  if (course.price <= 0) {
    enrollment.paymentStatus = "not_required";
    await enrollment.save();
    res.json({ success: true, data: { provider: "none", amount: 0, currency: "INR", status: "not_required" } });
    return;
  }

  enrollment.paymentStatus = "pending";
  await enrollment.save();

  res.json({
    success: true,
    data: {
      provider: "placeholder",
      amount: course.price,
      currency: "INR",
      status: "pending",
      message: "Payment integration placeholder. Connect Stripe/Razorpay here.",
    },
  });
});

