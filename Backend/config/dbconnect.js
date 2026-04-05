const mongoose = require("mongoose");
// 1. Ensure dotenv is loaded to read your MONGO_URI from .env
require("dotenv").config();

// 2. Standard global caching pattern for Mongoose
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToMongoDB() {
  const MONGO_URI = process.env.MONGO_URI;

  // 3. Validation
  if (!MONGO_URI) {
    console.error("❌ Error: MONGO_URI is missing in .env file");
    throw new Error("❌ MONGO_URI not found");
  }

  // 4. Return existing connection if available
  if (cached.conn) {
    console.log("⚡ Using cached MongoDB connection");
    return cached.conn;
  }

  // 5. If no promise exists, start the connection
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log("⏳ Connecting to MongoDB Atlas...");

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongooseInstance) => {
      console.log("✅ MongoDB Connected Successfully!");
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null; // Reset promise on error so we can try again
    console.error("❌ MongoDB Connection Error:", err.message);
    throw err;
  }

  return cached.conn;
}

module.exports = { connectToMongoDB };