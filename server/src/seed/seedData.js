import dotenv from "dotenv";
import connectDB from "../config/db.js";
import ensureDefaults from "../utils/bootstrapData.js";

dotenv.config();

const seed = async () => {
  await connectDB();
  await ensureDefaults();
  console.log("Seed data ensured successfully.");
  process.exit(0);
};

seed().catch((error) => {
  console.error(`Seeding failed: ${error.message}`);
  process.exit(1);
});
