import mongoose from "mongoose";

declare global {
  var mongoose: {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
  } | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<mongoose.Mongoose> {
  if (cached?.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    // During build time or if env is not set, return a dummy connection
    if (process.env.NODE_ENV === "production" && process.env.VERCEL === "1") {
      // On Vercel, wait for connection to be established
      throw new Error("MONGODB_URI is required");
    }
    // Return a mock for build time
    return {} as mongoose.Mongoose;
  }

  if (!cached?.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached!.promise = mongoose.connect(MONGODB_URI!, opts);
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
}

export default dbConnect;