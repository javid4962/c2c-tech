import mongoose from "mongoose";
import dns from "dns";

const redactMongoUri = (value = "") => value.replace(/(mongodb(?:\+srv)?:\/\/)([^@]+)@/i, "$1***@");

const configureMongoDns = (mongoUri) => {
  if (!mongoUri?.startsWith("mongodb+srv://")) {
    return;
  }

  const configuredServers = process.env.MONGODB_DNS_SERVERS || "8.8.8.8,1.1.1.1";
  const dnsServers = configuredServers
    .split(",")
    .map((server) => server.trim())
    .filter(Boolean);

  if (dnsServers.length) {
    dns.setServers(dnsServers);
  }
};

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("Missing MongoDB connection string. Set MONGO_URI.");
    }

    configureMongoDns(mongoUri);

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: Number(process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS || 10000),
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${redactMongoUri(error.message)}`);

    if (error.message?.includes("querySrv")) {
      console.error(
        "MongoDB SRV DNS lookup failed. Set MONGODB_DNS_SERVERS=8.8.8.8,1.1.1.1 or use a non-SRV mongodb:// connection string."
      );
    }

    if (error.message?.includes("Server selection timed out")) {
      console.error(
        "MongoDB host is not reachable. Check Atlas Network Access IP allowlist, firewall, VPN, and outbound port 27017."
      );
    }

    process.exit(1);
  }
};

export default connectDB;
