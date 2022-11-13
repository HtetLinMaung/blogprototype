import mongoose from "mongoose";

export default async function connectMongo(url = "") {
  return mongoose.connect(url || process.env.MONGO_URI);
}
