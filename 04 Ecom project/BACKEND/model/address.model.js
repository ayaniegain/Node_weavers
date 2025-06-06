import mongoose from "mongoose";
import addressSchema from "../schema/address.schema.js";

const Address = mongoose.model('Address', addressSchema);
export default Address