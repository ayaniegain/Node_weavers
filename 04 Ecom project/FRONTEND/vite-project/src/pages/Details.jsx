import React, { useState } from "react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router";
import { useFetchData } from "../context/FetchData";
import { useDispatch } from "react-redux";
import { addToCart, useFetchCart } from "../Redux/cartSlice";
import { toast } from "react-toastify";

function Details() {
  const { allProducts } = useFetchData();
  let cartItems = useFetchCart();

  console.log(cartItems);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  let dispatch = useDispatch();

  const productId = Number(searchParams.get("productId"));
  const productDetails = allProducts.find(
    (product) => product?.id === productId
  );
  const [activeTab, setActiveTab] = useState("details");

  if (!productDetails) {
    return (
      <h2 className="text-center text-xl font-semibold mt-10">Loading...</h2>
    );
  }

  const {
    images,
    category,
    title,
    price,
    discountPercentage,
    quantity,
    description,
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
    reviews,
    brand,
    id,
  } = productDetails;

  let originalPrice = (price / (1 - discountPercentage / 100)).toFixed(2);

  const similarProducts = allProducts.filter(
    (item) => item.category === category && item.id !== productId
  );

  function handleClick(id) {
    navigate(`?productId=${id}`);
  }

  function addToCartItems(productDetails) {
    toast.success("Item Added to Cart !");

    if (productDetails) {
      dispatch(addToCart(productDetails));
      navigate("/cart");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      <Link
        to={"/"}
        className="absolute top-4 left-4 tooltip text-white tooltip-right rounded-full p-2 bg-gray-700 hover:bg-black hover:text-white"
        data-tip="Home"
      >
        ←
      </Link>
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img
              src={images[0]}
              alt={title}
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div className="space-y-4">
            <span className="text-sm font-medium bg-yellow-300 text-gray-800 px-2 py-1 rounded">
              {category}
            </span>
            <h1 className="text-2xl font-bold">{title}</h1>
            <h2 className="text-lg font-medium text-gray-700">
              Brand: {brand}
            </h2>
            <h2 className="text-xl font-semibold text-green-600">
              ${price}{" "}
              <span className="line-through text-gray-500 ml-2">
                ${originalPrice}
              </span>
            </h2>

            {cartItems.some((cart) => cart.id === Number(id)) ? (
              <NavLink to={"/cart"}>
                <button className="bg-orange-700 text-white px-3 py-2 rounded-lg hover:bg-orange-500 mt-4">
                  Go to Cart
                </button>
              </NavLink>
            ) : (
              <NavLink to={"/cart"}>
                <button
                  className="bg-indigo-700 text-white px-3 py-2 rounded-lg hover:bg-teal-500 mt-4"
                  onClick={() => addToCartItems(productDetails)}
                >
                  Add to Cart
                </button>
              </NavLink>
            )}
            <div>
              <h2 className="text-lg font-semibold mt-6">
                View Similar Products
              </h2>
              <div className="flex flex-wrap gap-4 mt-2">
                {similarProducts.length > 0 ? (
                  similarProducts.slice(0, 4).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleClick(item.id)}
                      className="w-20 h-20 border rounded-lg overflow-hidden"
                    >
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))
                ) : (
                  <p className="text-gray-600">No similar products found.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-4">
          <div className="flex space-x-6">
            <button
              className={`px-4 py-2 text-lg font-medium ${
                activeTab === "details"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("details")}
            >
              Details
            </button>
            <button
              className={`px-4 py-2 text-lg font-medium ${
                activeTab === "reviews"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
          </div>

          <div className="mt-4">
            {activeTab === "details" ? (
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>Description:</strong> {description}
                </p>
                <p className="text-gray-700">
                  <strong>Warranty:</strong> {warrantyInformation}
                </p>
                <p className="text-gray-700">
                  <strong>Shipping:</strong> {shippingInformation}
                </p>
                <p className="text-gray-700">
                  <strong>Availability:</strong> {availabilityStatus}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg shadow-md"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                        <div>
                          <h3 className="text-lg font-semibold">
                            {review.reviewerName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex mt-2">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < review.rating
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }
                          >
                            ⭐
                          </span>
                        ))}
                      </div>
                      <p className="mt-2 text-gray-800">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No reviews yet.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
