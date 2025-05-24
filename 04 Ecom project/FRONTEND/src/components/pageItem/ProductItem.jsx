import React from "react";
import { useFetchWishList } from "../../context/wishlistContext";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import { useFetchData } from "../../context/FetchData";

function Product({ product, avgRating, handleClick }) {
  const { wishlist, dispatch } = useFetchWishList();
  const { allProducts, setAllProducts } = useFetchData();

  const navigate = useNavigate();
  const location = useLocation();

  // Check if the product is already in the wishlist
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const handleAddItem = (id) => {
    if (!isInWishlist) {
      const updatedProducts = allProducts.map((item) =>
        item.id === Number(id) ? { ...item, wishList: true } : item
      );

      setAllProducts(updatedProducts);

      toast.success("Added to Wishlist");
      dispatch({ type: "ADD_ITEM", payload: id });
      navigate("/wishlist");
    }
  };

  const handleRemoveItem = (id) => {
    const updatedProducts = allProducts.map((item) =>
      item.id === Number(id) ? { ...item, wishList: false } : item
    );

    setAllProducts(updatedProducts); 


    toast.error("Removed from Wishlist");
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-all">
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-40 object-contain rounded-md"
        />

        {location.pathname === "/wishlist" ? (
          <button
            onClick={() => handleRemoveItem(product.id)}
            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
          >
            ❌
          </button>
        ) : (
          <button
            onClick={() => handleAddItem(product.id)}
            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
            disabled={isInWishlist}
          >
            {isInWishlist ? "✅" : "✴️"}
          </button>
        )}
      </div>

      {/* Product Details */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="text-gray-500 text-sm">
          {product.description.slice(0, 50)}...
        </p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold">${product.price}</span>
          <span className="text-green-500 text-sm flex items-center">
            {Array(Math.floor(avgRating))
              .fill()
              .map((_, i) => (
                <span key={i} className="text-yellow-500">
                  ⭐
                </span>
              ))}
            <p className="text-orange-700 ml-2">{product.rating.rate}</p>
            {avgRating} ({product.reviews.length})
          </span>
        </div>

        <div className="flex justify-center items-center pt-2">
          <button
            onClick={() => handleClick(product.id)}
            className="mt-4 w-1/2 text-center bg-teal-900 text-white border border-gray-400 py-2 rounded-full hover:bg-gray-900 hover:text-white transition"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
