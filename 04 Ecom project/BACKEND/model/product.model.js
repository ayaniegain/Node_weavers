import mongoose from "mongoose";
import productSchema from "../schema/product.schema.js";

const Product = mongoose.model('Product', productSchema);
export default Product