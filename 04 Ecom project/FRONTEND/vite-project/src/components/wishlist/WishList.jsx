import React from "react";
import { useFetchWishList } from "../../context/wishlistContext";
import Product from "../pageItem/ProductItem";
import { useNavigate } from "react-router";

function WishList() {
  let { wishlist, dispatch } = useFetchWishList();

  console.log(wishlist)
  const navigate = useNavigate();

  function handleClick(id) {
    navigate(`/details?productId=${id}`);
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          ❤️ Your Wishlist
        </h2>

        {wishlist && wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => {
              const totalRating = product.reviews.reduce(
                (sum, review) => sum + review.rating,
                0
              );
              const avgRating = (totalRating / product.reviews.length).toFixed(
                1
              );

              return (
                <div key={product.id} className="transition-transform transform hover:scale-105">
                  <Product
                    product={product}
                   
                    avgRating={avgRating}
                    handleClick={handleClick}
                    dispatch={dispatch}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center mt-16">
          
            <h2 className="text-2xl font-semibold text-gray-600">
              Oops! No products found in your wishlist.
            </h2>
            <p className="text-gray-500 mt-2">
              Start adding your favorite products now!
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 bg-teal-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-teal-700 transition"
            >
              Explore Products
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default WishList;
