import SiteSettings from "../models/SiteSettings.js";
import asyncHandler from "../utils/asyncHandler.js";
import { defaultSettings } from "../seed/defaultContent.js";

export const getSettings = asyncHandler(async (req, res) => {
  let settings = await SiteSettings.findOne();

  if (!settings) {
    settings = await SiteSettings.create(defaultSettings);
  }

  res.json({ success: true, data: settings });
});

export const updateSettings = asyncHandler(async (req, res) => {
  let settings = await SiteSettings.findOne();

  if (!settings) {
    settings = await SiteSettings.create(req.body);
    res.status(201).json({ success: true, data: settings });
    return;
  }

  settings.set(req.body);
  const updatedSettings = await settings.save();
  res.json({ success: true, data: updatedSettings });
});

