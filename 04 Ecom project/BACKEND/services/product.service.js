import Product from "../model/product.model.js";

export async function allProduct() {
  return await Product.find({});
}

export async function addNewProduct(productData) {
  const newProduct = new Product(productData);

  return await newProduct.save();
}

export async function removeProduct(productId) {
  return await Product.findByIdAndDelete(productId);

 
}
