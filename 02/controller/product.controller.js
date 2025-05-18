import { log } from "console";
import fs from "fs";

const data = JSON.parse(
  fs.readFileSync(new URL("../data.json", import.meta.url))
);

let mydata = [...data];

let createProduct = (req, res) => {
  res.status(201).send(mydata);
};

let getAllProducts = (req, res) => {

  console.log("ss")
  let { categories, brand, inStock, minPrice, maxPrice, price_gt } = req.query;
  let product = mydata;

  if (categories) {
    let queryCategory = categories.split(",");
    product = product.filter((item) => queryCategory.includes(item.category));
  }

  if (brand) {
    let queryBrand = brand.split(",");

    product = product.filter((item) => queryBrand.includes(item.brand));
  }
//instock this way applied?
  if (inStock) {
    const checkStock = inStock === "true";
    product = product.filter((item) => item?.inStock === checkStock);
  }
//why or not and
  if (minPrice || maxPrice) {
    product = product.filter((item) => {
      if (item.price >= minPrice && item.price <= maxPrice) {
        return item;
      }
    });
  }
  if (price_gt) {
    product = product.filter((item) => item.price >= price_gt);
  }

  if (name) {
    
  }

  res.status(200).send({ data: product, count: product.length });
};

let getSingleProducts = (req, res) => {
  let id = req.params.id;

  let product = mydata.find((item) => item.id === +id);

  res.status(200).send(product);
};
//what will be the probem

let searchproducts = (req, res) => {
  console.log("name")
  let {name} = req.query


  let product = mydata.filter((item) =>item.name.toLowerCase().includes(name.trim().toLowerCase()));

  console.log(product)

  res.status(200).send({ data: product, count: product.length });

};



export { createProduct, getAllProducts, getSingleProducts,searchproducts };
