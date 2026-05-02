import jwt from "jsonwebtoken";
import AdminUser from "../models/AdminUser.js";
import asyncHandler from "../utils/asyncHandler.js";

export const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    res.status(401);
    throw new Error("Not authorized. Token missing.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await AdminUser.findById(decoded.id).select("-password");

    if (!admin) {
      res.status(401);
      throw new Error("Admin user no longer exists.");
    }

    req.user = admin;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Invalid or expired token.");
  }
});

