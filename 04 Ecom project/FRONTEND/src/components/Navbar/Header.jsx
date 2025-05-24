import React from "react";
import logo from "../../../src/assets/img/logo.svg";
import wishlist from "../../../src/assets/img/wishlist.svg";
import Search from "../Search/Search";
import { Link, NavLink, useLocation } from "react-router";
import { logOut, useAuth } from "../../Redux/authSlice";
import { useDispatch } from "react-redux";
import { useFetchCart } from "../../Redux/cartSlice";
import { useFetchData } from "../../context/FetchData";
import { toast } from "react-toastify";

function Header() {
  let { loginUser } = useAuth();
  let { cartDetails } = useFetchData();
  let location= useLocation()

 

  let dispatch = useDispatch();

  function handleLogout() {
    toast.warn("logout user !");
    dispatch(logOut());
    localStorage.removeItem("authUser");
    localStorage.removeItem("redirect");
    window.location.reload();
  }

  return (
    <div className="navbar bg-gray-100 px-6 shadow-md">
      <div className="flex-1">
        <NavLink to={"/"}>
          <img
            src={logo}
            alt="logo"
            className="h-12 w-48 rounded-lg shadow-lg"
          />
        </NavLink>
      </div>

      <div className="flex items-center justify-center ">
        {
          location?.pathname ==="/" ?
          <Search />
          
          : ""
        }
      </div>

{/* //cart */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle relative "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="badge badge-sm indicator-item absolute top-0 right-0 bg-teal-700 text-white">
              {" "}
              {cartDetails.Cartlength ? cartDetails.Cartlength : 0}
            </span>
          </div>

          <div
            tabIndex={0}
            className="dropdown-content card card-compact bg-white rounded-md z-10 mt-3 w-60 p-4 shadow-lg"
          >
            <span className="text-lg font-semibold">
              {" "}
              {cartDetails.Cartlength ? cartDetails.Cartlength : 0} Items
            </span>
            <span className="text-teal-700">
              Subtotal: $
              {Math.floor(
                cartDetails.totalPrice
                  ? cartDetails.totalPrice + cartDetails.deliveryCharge
                  : 0
              )}
            </span>
            <div className="card-actions mt-2">
              <NavLink
              
                to={"cart"}
                className="btn bg-teal-700 text-white w-full hover:bg-teal-800"
              >
                View Cart
              </NavLink>
            </div>
          </div>
        </div>
        {/* //wishlist */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle relative"
          >
            <Link to={"/wishlist"} className="tooltip text-black tooltip-right"
              data-tip="wishlist"
            
            >
           <img src={wishlist} alt={wishlist} className="h-7 w-7 "
           />
            </Link>
           
          </div>

       
        </div>
{/* user */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div
              className={`w-10 rounded-full border-4 ${
                loginUser ? "border-green-400" : "border-red-600"
              }`}
            >
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              {loginUser ? (
                <a className="justify-between text-orange-400">
                  {loginUser?.name}
                  <span className="badge bg-green-500 text-white">New</span>
                </a>
              ) : (
                <a className="justify-between">
                  USER
                  <span className="badge bg-green-500 text-white">New</span>
                </a>
              )}
            </li>
            <li>
              <Link to={"/wishlist"}>WishList ⭐</Link>
            </li>

            {loginUser ? (
              <li>
                <Link onClick={handleLogout}>SignOut</Link>
              </li>
            ) : (
              <li>
                <Link to={"login"}>Login/Register</Link>
              </li>
            )}
          </ul>
        </div>
    </div>
  );
}

export default Header;
