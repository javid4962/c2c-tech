import fs from "fs-extra";
import path from "path";
import { cloudinary, cloudinaryEnabled } from "../config/cloudinary.js";

export const buildFileUrl = (req, filename) =>
  `${req.protocol}://${req.get("host")}/uploads/${filename}`;

export const uploadAsset = async (req, file) => {
  if (!file) {
    return "";
  }

  if (cloudinaryEnabled && file.mimetype.startsWith("image/")) {
    const response = await cloudinary.uploader.upload(file.path, {
      folder: process.env.CLOUDINARY_FOLDER || "c2c-tech",
      resource_type: "image",
    });
    await fs.remove(file.path);
    return response.secure_url;
  }

  return buildFileUrl(req, path.basename(file.path));
};

