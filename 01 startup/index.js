import chalk from "chalk";
import express from "express";
import dotenv from "dotenv";

import sampleData from "./sample.js";

dotenv.config();
let app = express();
app.use(express.json());
app.use(express.text({ type: "text/html" }));
let PORT = process.env.PORT;

app.get("/api/products", (req, res) => {
  let allproduct = sampleData;
  res.status(200).send(allproduct);
});

app.get("/api/product/:id", (req, res) => {
  let pId = req.params.id;

  let product = sampleData.find((item) => item.id === +pId);

  res.status(200).send(product);
});

// app.get("/api/products/search/name", (req, res) => {
//   const { q } = req.query;
//   if (q) {
//     const filtered = sampleData.filter((item) =>
//       item.name.toLowerCase().includes(q.toLowerCase())
//     );
//     return res.status(200).json(filtered);
//   }

//   res.status(200).json(sampleData);
// });

app.get("/api/products/sort/name", (req, res) => {
  let { sortby, order } = req.query;

  console.log(sortby);
  console.log(order);

  if (sortby === "name" && order === "asc") {
    let soreddata = sampleData.sort((a, b) => a.name.localeCompare(b.name));

    res.status(200).send(soreddata);
  }
});
app.get("/api/products/sort/price", (req, res) => {
  try {
    let { sortby, order } = req.query;

    if (sortby !== "price" || (order !== "asc" && order !== "desc")) {
      return res
        .status(400)
        .send("Invalid query parameters. Use sortby=price and order=asc/desc.");
    }

    let sortedData = [...sampleData];

    sortedData.sort((a, b) => {
      return order === "desc" ? b.price - a.price : a.price - b.price;
    });

    res.status(200).json(sortedData);
  } catch (error) {
    console.error("Error while sorting data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/products/search/price", (req, res) => {
  try {
    let { min, max } = req.query;

    console.log(max);

    if (min < 10) {
      return res
        .status(400)
        .send("Invalid query parameters. min price should more");
    }

    let filterData = [...sampleData];

    filterData = filterData.filter(
      (item) =>
        Number(item.price) >= Number(min) && Number(item.price) <= Number(max)
    );

    res.status(200).json(filterData);
  } catch (error) {
    console.error("Error while sorting data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/products/filter/category", (req, res) => {
  try {
    const { categories } = req.query;

    if (!categories) {
      return res.status(400).send("Missing 'categories' query parameter.");
    }

    const categoryList = categories.split(",").map((cat) => cat.trim());

    const filteredData = sampleData.filter((item) =>
      categoryList.includes(item.category)
    );

    res.status(200).json(filteredData);
  } catch (error) {
    console.error("Error while filtering products by category:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/products/filter/price-gt", (req, res) => {
  try {
    let { price } = req.query;

    if (!price) {
      return res.status(400).send("Invalid query parameters");
    }

    let filteredprice = sampleData.filter((item) => item.price >= price);

    res.status(200).send(filteredprice);
  } catch (error) {
    console.error("Error while sorting data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/products/search", (req, res) => {
  try {
    let { name, minPrice, category, sortBy } = req.query;

    let [sortByproduct, order] = sortBy.split(":");


    let product = sampleData.filter((item) => {
      if (item.price >= minPrice && item.category === category) {
        return item.name.includes(name);
      }
    });

    if (sortByproduct ==="price" & order==="desc" ) {
      
      
      filteredData=  product.sort((a, b) => a.price - b.price);
      
      res.status(200).json(filteredData);
    }
  } catch (error) {
    console.error("Error while filtering products by category:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/products/search", (req, res) => {
  try {
    let { name = "", minPrice = 0, category, sortBy } = req.query;

    minPrice = Number(minPrice); // Convert to number

    let product = sampleData.filter((item) => {
      return (
        item.price >= minPrice &&
        item.category === category &&
        item.name.toLowerCase().includes(name.toLowerCase())
      );
    });

    if (sortBy) {
      let [sortByProduct, order] = sortBy.split(":");

      if (sortByProduct === "price" && order === "desc") {
        product.sort((a, b) => b.price - a.price);
      } else if (sortByProduct === "price" && order === "asc") {
        product.sort((a, b) => a.price - b.price);
      }
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error while filtering products by category:", error);
    res.status(500).send("Internal Server Error");
  }
});


app.listen(PORT, () => {
  console.log(chalk.bgRed(chalk.gray(`running on port no `, PORT)));
});
