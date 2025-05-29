import React, { useEffect, useState } from "react";
import { useFetchData } from "../../context/FetchData";

function Search() {
  const [query, setQuery] = useState("");
  const { allProducts, setAllProducts,originalProducts } = useFetchData(); 



  function handleInputChange(e) {
    setQuery(e.target.value);
  }

  useEffect(() => {
    if (query.trim() === "") {
      setAllProducts(originalProducts);
    } else {
      let filteredList = allProducts.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setAllProducts(filteredList);
    }
  }, [query]);

  return (
    <div className="relative max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        onChange={handleInputChange}
      />

      {query && allProducts.length > 0 && (
        <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg max-h-60 overflow-y-auto z-10">
          {allProducts.map((product, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-indigo-100 transition-all cursor-pointer"
            >
              {product.title}
            </li>
          ))}
        </ul>
      )}

      {query && allProducts.length === 0 && (
        <div className="z-10 absolute left-0 right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg p-3 text-gray-600 text-center">
          No products found.
        </div>
      )}
    </div>
  );
}

export default Search;
