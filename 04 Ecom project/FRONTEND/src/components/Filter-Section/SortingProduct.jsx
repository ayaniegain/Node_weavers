import React, { useEffect, useState } from "react";
import downArrowLogoBlack from "../../../src/assets/img/arrow_down_black.svg";
import { useFetchData } from "../../context/FetchData";

function SortingProduct() {
  const { allProducts, setAllProducts, originalProducts } = useFetchData();
  const [categories, setCategories] = useState([]);
  const [rating, setRating] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    setCategories([...new Set(originalProducts.map((item) => item.category))]);
    setRating([...new Set(originalProducts.map((item) => item.rating))].sort());
  }, [originalProducts]);

  function sortBySelection(action) {
    let sortedProducts = [...allProducts];

    if (action === "name") {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (action === "low") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (action === "high") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setAllProducts([...sortedProducts]); 
  }

  function filterByCategory(category) {
    setSelectedCategory(category);
    const filtered = originalProducts.filter((product) => product.category === category);
    setAllProducts(filtered);
  }

  function filterByRating(event) {
    const selectedValue = Number(event.target.value);
    setSelectedRating(selectedValue);

    const filteredProducts = originalProducts.filter(({ rating }) => Number(rating) >= selectedValue);
    setAllProducts(filteredProducts);
  }

  function resetFilter() {
    setAllProducts(originalProducts);
    setSelectedRating(0);
    setSelectedCategory("");
  }

  return (
    <div className="flex flex-wrap justify-between items-center px-6 py-4">
      {/* Filter Section */}
      <section className="flex flex-wrap gap-4">
        {/* Category Dropdown */}
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 transition"
          >
            {selectedCategory ? `Category: ${selectedCategory}` : "Categories"}
            <img src={downArrowLogoBlack} alt="down arrow" className="h-4 w-4" />
          </div>
          <ul tabIndex={0} className="dropdown-content menu bg-white rounded-lg z-10 w-52 p-2 shadow-md">
            <li>
              <a onClick={() => resetFilter()}>All Categories</a>
            </li>
            {categories.map((item, i) => (
              <li key={i} className="capitalize">
                <a onClick={() => filterByCategory(item)}>{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Rating Dropdown */}
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 transition"
          >
            Rating ⭐ {selectedRating}
            <img src={downArrowLogoBlack} alt="down arrow" className="h-4 w-4" />
          </div>
          <div className="dropdown-content bg-white rounded-lg z-10 w-52 p-4 shadow-md">
            <input
              type="range"
              min={Math.min(...rating)}
              max={Math.max(...rating)}
              value={selectedRating}
              className="range range-sm range-warning w-full"
              onChange={filterByRating}
            />
            <p className="text-center text-sm mt-2">{selectedRating} ⭐ & Up</p>
          </div>
        </div>

        {/* Reset Button */}
        <div className="my-1">
          <button onClick={resetFilter} className="btn btn-sm btn-outline btn-success">
            RESET FILTER
          </button>
        </div>
      </section>

      {/* Sort By Section */}
      <section>
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="flex items-center gap-2 px-2 mr-20 py-2 bg-white border rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 transition"
          >
            Sort By
            <img src={downArrowLogoBlack} alt="down arrow" className="h-4 w-4" />
          </div>
          <ul tabIndex={0} className="dropdown-content menu bg-white rounded-lg z-10 w-44 p-2 shadow-md">
            <li>
              <a onClick={() => sortBySelection("name")}>Name A-Z</a>
            </li>
            <li>
              <a onClick={() => sortBySelection("low")}>Price -- Low to High</a>
            </li>
            <li>
              <a onClick={() => sortBySelection("high")}>Price -- High to Low</a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default SortingProduct;
