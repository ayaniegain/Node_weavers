import mongoose from "mongoose";

export async function DBConnect() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}