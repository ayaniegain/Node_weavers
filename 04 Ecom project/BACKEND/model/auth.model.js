import mongoose from "mongoose";
import authSchema from "../schema/auth.schema.js";

const Auth = mongoose.model('Auth', authSchema);
export default Auth