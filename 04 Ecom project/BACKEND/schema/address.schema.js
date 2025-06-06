import mongoose from "mongoose";
const { Schema } = mongoose;

const addressSchema = new Schema({
    street:String,
    city: String,
    pincode: String
});

export default addressSchema;
