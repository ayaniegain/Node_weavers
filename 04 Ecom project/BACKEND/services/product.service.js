import Product from "../model/product.model.js";
//  min max price , partial( brand name ,product name )
export async function allProduct({
  productName,
  category,
  minPrice,
  maxPrice,
}) {
  let query = {};

  // if (search) {
  //   query.name = search;
  // }

  // Partial match on product name
  if (productName) {
    query.title = { $regex: productName, $options: "i" };
  }

  // Partial match on category
  if (category) {
    query.category = { $regex: category, $options: "i" };
  }

  // Price range filter
  if (minPrice !== undefined || maxPrice !== undefined) {
    query.price = {};
    if (minPrice !== undefined && maxPrice === undefined) {
      query.price.$gte = minPrice;
    } else if (maxPrice !== undefined && minPrice === undefined) {
      query.price.$lte = maxPrice;
    } else if (maxPrice !== undefined && minPrice !== undefined) {
      query.price = {
        $gte: minPrice,
        $lte: maxPrice,
      };
    }
  }

  console.log("query", query);
  return await Product.find(query);
}

// const products = await Product.find({
//   name: { $regex: "lap", $options: "i" },
//   category: { $regex: "comp", $options: "i" },
//   price: { $gte: 30000, $lte: 90000 }
// });

export async function addNewProduct(productData) {
  const newProduct = new Product(productData);

  return await newProduct.save();
}

export async function removeProduct(productId) {
  return await Product.findByIdAndDelete(productId);
}
