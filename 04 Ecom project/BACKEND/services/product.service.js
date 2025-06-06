import Product from "../model/product.model.js";

export async function allProduct({ search, sortBy, category, order }) {
  let query = {};

  if (search) {
    query.name = search;
  }

  return await Product.find(query);
}

export async function addNewProduct(productData) {
  const newProduct = new Product(productData);

  return await newProduct.save();
}

export async function removeProduct(productId) {
  return await Product.findByIdAndDelete(productId);
}
