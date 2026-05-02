import crypto from "crypto";

const otpSecret = () => process.env.OTP_HASH_SECRET || process.env.JWT_SECRET || "c2c-dev-otp-secret";

export const normalizePhone = (value = "") => {
  const trimmed = value.toString().trim();
  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");

  if (digits.length < 8 || digits.length > 15) {
    return "";
  }

  return `${hasPlus ? "+" : "+"}${digits}`;
};

export const generateOtp = () => {
  const length = Number(process.env.OTP_LENGTH || 6);
  const min = 10 ** (length - 1);
  const max = 10 ** length - 1;
  return crypto.randomInt(min, max + 1).toString();
};

export const hashOtp = (phone, otp) =>
  crypto.createHmac("sha256", otpSecret()).update(`${phone}:${otp}`).digest("hex");

export const otpMatches = (phone, otp, expectedHash) => {
  if (!otp || !expectedHash) return false;

  const actual = Buffer.from(hashOtp(phone, otp), "hex");
  const expected = Buffer.from(expectedHash, "hex");

  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
};

export const otpExpiryDate = () => {
  const minutes = Number(process.env.OTP_EXPIRES_MINUTES || 10);
  return new Date(Date.now() + minutes * 60 * 1000);
};
