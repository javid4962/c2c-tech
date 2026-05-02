import AdminUser from "../models/AdminUser.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";

export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await AdminUser.findOne({ email: email?.toLowerCase() });

  if (!admin || !(await admin.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password.");
  }

  res.json({
    success: true,
    token: generateToken(admin._id),
    user: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
});

export const getCurrentAdmin = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

