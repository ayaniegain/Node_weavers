import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: String,
    imageUrl: String,
    description: String,
    price: Number,
    quantity: Number,
});

export const Product = mongoose.model("Product", productSchema);