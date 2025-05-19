import Product from "../model/product.model.js";

export async function allProduct() {
  return await Product.find({}); //where return where not return ?
}

export async function addNewProduct(productData) {
  const newProduct = new Product(productData); //how it know it is arry of oject ?

  return await newProduct.save();
}

export async function removeProduct(productId) {
  return await Product.findByIdAndDelete(productId);

 
}
