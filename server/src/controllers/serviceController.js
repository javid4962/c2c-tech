import Service from "../models/Service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getServices = asyncHandler(async (req, res) => {
  const query = {};

  if (req.query.featured === "true") {
    query.featured = true;
  }

  const services = await Service.find(query).sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: services });
});

export const getServiceBySlug = asyncHandler(async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug });

  if (!service) {
    res.status(404);
    throw new Error("Service not found.");
  }

  res.json({ success: true, data: service });
});

export const createService = asyncHandler(async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json({ success: true, data: service });
});

export const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error("Service not found.");
  }

  Object.assign(service, req.body);
  const updatedService = await service.save();
  res.json({ success: true, data: updatedService });
});

export const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error("Service not found.");
  }

  await service.deleteOne();
  res.json({ success: true, message: "Service deleted." });
});

