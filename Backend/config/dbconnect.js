const mongoose = require("mongoose");
// Vercel handles envs automatically, but keeping this for local safety
if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToMongoDB() {
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    throw new Error("❌ MONGO_URI is missing in Vercel Environment Variables");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    // REMOVED bufferCommands: false to prevent the crash
    cached.promise = mongoose.connect(MONGO_URI, {
      connectTimeoutMS: 10000, // Give it 10 seconds to wake up
    }).then((mongooseInstance) => {
      console.log("✅ MongoDB Connected");
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; 
    throw e;
  }

  return cached.conn;
}

module.exports = { connectToMongoDB };