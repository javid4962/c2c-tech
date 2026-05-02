export const sendSms = async ({ to, message }) => {
  const providerUrl = process.env.SMS_PROVIDER_URL;
  const providerToken = process.env.SMS_PROVIDER_TOKEN;

  if (!providerUrl) {
    console.log(`SMS skipped for ${to}: ${message}`);
    return { skipped: true };
  }

  const response = await fetch(providerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(providerToken ? { Authorization: `Bearer ${providerToken}` } : {}),
    },
    body: JSON.stringify({
      to,
      message,
      sender: process.env.SMS_SENDER_ID || "C2C",
    }),
  });

  if (!response.ok) {
    throw new Error("Unable to send OTP SMS.");
  }

  return { skipped: false };
};
