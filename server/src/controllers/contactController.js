import Contact from "../models/Contact.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendEmail } from "../utils/sendEmail.js";

export const submitContact = asyncHandler(async (req, res) => {
  const contact = await Contact.create(req.body);

  await sendEmail({
    subject: `New contact inquiry from ${contact.fullName}`,
    replyTo: contact.email,
    html: `
      <h2>New Website Inquiry</h2>
      <p><strong>Name:</strong> ${contact.fullName}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Phone:</strong> ${contact.phone || "Not provided"}</p>
      <p><strong>Company:</strong> ${contact.company || "Not provided"}</p>
      <p><strong>Service Interest:</strong> ${contact.serviceInterest || "General"}</p>
      <p><strong>Message:</strong> ${contact.message}</p>
    `,
  });

  res.status(201).json({
    success: true,
    message: "Your message has been received. Our team will reach out soon.",
    data: contact,
  });
});

export const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json({ success: true, data: contacts });
});

export const updateContactStatus = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact inquiry not found.");
  }

  contact.status = req.body.status || contact.status;
  const updatedContact = await contact.save();
  res.json({ success: true, data: updatedContact });
});

