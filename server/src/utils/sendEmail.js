import nodemailer from "nodemailer";

const buildTransport = () => {
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_PORT ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS
  ) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export const sendEmail = async ({ subject, html, replyTo }) => {
  const transporter = buildTransport();

  if (!transporter || !process.env.CONTACT_RECEIVER_EMAIL) {
    console.log(`Email skipped: ${subject}`);
    return { skipped: true };
  }

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.CONTACT_RECEIVER_EMAIL,
    subject,
    html,
    replyTo,
  });

  return { skipped: false };
};

