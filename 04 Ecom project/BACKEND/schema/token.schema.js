import mongoose from "mongoose";
const { Schema } = mongoose;

const tokenSchema = new Schema({
  token: String,
  expireAt: Date
});

export default tokenSchema;
