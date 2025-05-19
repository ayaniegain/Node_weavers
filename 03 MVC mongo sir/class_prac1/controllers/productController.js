import { addNewProduct, getAllProducts } from "../services/productService.js"

export const fetchAllProducts = async (req, res) => {
    try {
        const result = await getAllProducts();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

export const createProduct = async (req, res) => {
    try {
        const savedProduct = await addNewProduct(req.body);
        res.json({ message: 'Data saved successfully', savedProduct });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save product' });
    }
};
