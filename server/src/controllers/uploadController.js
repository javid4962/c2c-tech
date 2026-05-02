import asyncHandler from "../utils/asyncHandler.js";
import { uploadAsset } from "../utils/uploadAsset.js";

export const uploadSingleAsset = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(422);
    throw new Error("No file uploaded.");
  }

  const url = await uploadAsset(req, req.file);

  res.status(201).json({
    success: true,
    data: {
      url,
      originalName: req.file.originalname,
    },
  });
});

