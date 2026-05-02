import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import ensureDefaults from "./utils/bootstrapData.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await ensureDefaults();

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

startServer();
