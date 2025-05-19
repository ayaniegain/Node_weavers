import { Product } from "../models/Porduct.Models.js";

export const getAllProducts = async () => {
  return await Product.find({});
};

export const addNewProduct = async (productData) => {
  const newProduct = new Product(productData);
  return await newProduct.save();
};
