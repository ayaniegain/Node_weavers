import mongoose from "mongoose";
const { Schema } = mongoose;

const authSchema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: Schema.ObjectId, ref: "Address" },
});

export default authSchema;
