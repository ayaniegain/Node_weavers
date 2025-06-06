import {
  addNewProduct,
  allProduct,
  removeProduct,
} from "../services/product.service.js";

export async function createProduct(req, res) {
  try {
    const savedProduct = await addNewProduct(req.body);
    res.json({ message: "Data saved successfully", savedProduct });
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
}

export async function fetchAllProducts(req, res) {

  let {search,sortBy ,category, order } =req.query

  try {
    const result = await allProduct({search,sortBy ,category, order});
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
}

export async function deleteProduct(req, res) {
  let { id } = req.params;

  console.log(id);
  try {
    const result = await removeProduct(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
}
