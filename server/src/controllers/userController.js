import PhoneOtp from "../models/PhoneOtp.js";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import { generateOtp, hashOtp, normalizePhone, otpExpiryDate, otpMatches } from "../utils/phoneOtp.js";
import { sendSms } from "../utils/sendSms.js";

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role,
  authProvider: user.authProvider,
});

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  const normalizedPhone = phone ? normalizePhone(phone) : "";

  const existing = await User.findOne({ email: email?.toLowerCase() });
  if (existing) {
    res.status(400);
    throw new Error("User already exists.");
  }

  if (phone && !normalizedPhone) {
    res.status(422);
    throw new Error("Enter a valid phone number with country code.");
  }

  if (normalizedPhone) {
    const phoneExists = await User.findOne({ phone: normalizedPhone });
    if (phoneExists) {
      res.status(400);
      throw new Error("Phone number is already linked to an account.");
    }
  }

  const user = await User.create({
    name,
    email: email?.toLowerCase(),
    phone: normalizedPhone || undefined,
    password,
    authProvider: normalizedPhone ? "hybrid" : "password",
  });

  res.status(201).json({
    success: true,
    token: generateToken(user._id),
    user: publicUser(user),
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email?.toLowerCase() });

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password.");
  }

  res.json({
    success: true,
    token: generateToken(user._id),
    user: publicUser(user),
  });
});

export const requestPhoneOtp = asyncHandler(async (req, res) => {
  const { phone, name } = req.body;
  const normalizedPhone = normalizePhone(phone);

  if (!normalizedPhone) {
    res.status(422);
    throw new Error("Enter a valid phone number with country code.");
  }

  const recentOtp = await PhoneOtp.findOne({
    phone: normalizedPhone,
    consumedAt: null,
    createdAt: { $gt: new Date(Date.now() - 60 * 1000) },
  });

  if (recentOtp) {
    res.status(429);
    throw new Error("Please wait before requesting another OTP.");
  }

  const otp = generateOtp();
  await PhoneOtp.deleteMany({ phone: normalizedPhone, consumedAt: null });
  await PhoneOtp.create({
    phone: normalizedPhone,
    name,
    otpHash: hashOtp(normalizedPhone, otp),
    expiresAt: otpExpiryDate(),
  });

  await sendSms({
    to: normalizedPhone,
    message: `Your C2C Tech Solutions verification code is ${otp}. It expires in ${process.env.OTP_EXPIRES_MINUTES || 10} minutes.`,
  });

  res.json({
    success: true,
    message: "OTP sent successfully.",
    data: {
      phone: normalizedPhone,
      devOtp: process.env.NODE_ENV === "production" ? undefined : otp,
    },
  });
});

export const verifyPhoneOtp = asyncHandler(async (req, res) => {
  const { phone, otp, name } = req.body;
  const normalizedPhone = normalizePhone(phone);

  if (!normalizedPhone) {
    res.status(422);
    throw new Error("Enter a valid phone number with country code.");
  }

  const challenge = await PhoneOtp.findOne({
    phone: normalizedPhone,
    consumedAt: null,
    expiresAt: { $gt: new Date() },
  }).sort({ createdAt: -1 });

  if (!challenge) {
    res.status(400);
    throw new Error("OTP expired or not found. Request a new code.");
  }

  if (challenge.attempts >= 5) {
    res.status(429);
    throw new Error("Too many incorrect attempts. Request a new OTP.");
  }

  if (!otpMatches(normalizedPhone, otp, challenge.otpHash)) {
    challenge.attempts += 1;
    await challenge.save();
    res.status(401);
    throw new Error("Invalid OTP.");
  }

  let user = await User.findOne({ phone: normalizedPhone });

  if (!user) {
    user = await User.create({
      name: name || challenge.name || `Learner ${normalizedPhone.slice(-4)}`,
      phone: normalizedPhone,
      phoneVerifiedAt: new Date(),
      authProvider: "otp",
    });
  } else {
    user.phoneVerifiedAt = user.phoneVerifiedAt || new Date();
    if (user.authProvider === "password") {
      user.authProvider = "hybrid";
    }
    if (name && user.name?.startsWith("Learner ")) {
      user.name = name;
    }
    await user.save();
  }

  challenge.consumedAt = new Date();
  await challenge.save();

  res.json({
    success: true,
    token: generateToken(user._id),
    user: publicUser(user),
  });
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  res.json({ success: true, user: publicUser(req.user) });
});
