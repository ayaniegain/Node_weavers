import mongoose from "mongoose";
import tokenSchema from "../schema/token.schema.js";


const Token = mongoose.model('Token', tokenSchema);
export default Token