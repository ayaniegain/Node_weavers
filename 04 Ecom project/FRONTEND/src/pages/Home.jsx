import React, { useEffect, useState } from "react";
import { useFetchData } from "../context/FetchData";
import SimmerEffect from "../components/Effect/SimmerEffect";
import Banner from "../components/Banner/Banner";
import SortingProduct from "../components/Filter-Section/SortingProduct";
import { Link, NavLink, useNavigate } from "react-router";
import Product from "../components/pageItem/ProductItem";

function Home() {
  const { allProducts } = useFetchData();
  const navigate = useNavigate();
  function handleClick(id) {
    navigate(`details?productId=${id}`);
  }
  return (
    <div className="flex min-h-screen flex-col">
      <SortingProduct />
      <Banner />

      {/* Products Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Products For You!</h2>

        {allProducts && allProducts.length > 0 ? (
          <div className="grid   grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center justify-center">
            {allProducts.map((product) => {
              // Calculate the average rating from reviews
              const totalRating = product.reviews.reduce(
                (sum, review) => sum + review.rating,
                0
              );
              const avgRating = (totalRating / product.reviews.length).toFixed(
                1
              );

              return (
                <div key={product.id}>
                  <Product
                    product={product}
                    avgRating={avgRating}
                    handleClick={handleClick}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-wrap gap-10">
            <SimmerEffect />
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
