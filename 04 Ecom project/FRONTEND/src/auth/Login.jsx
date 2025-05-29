import React, { useEffect, useState } from "react";

import Authimg from "../../src/assets/img/auth-background.jpg";
import { toast } from "react-toastify";

import { NavLink, useNavigate } from "react-router";
import { fetchLoginAuth, reset, useAuth } from "../Redux/authSlice";
import { useDispatch } from "react-redux";

function Login() {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let { message, loading, success, error } = useAuth();


  let initlogin = {
    email: "",
    password: "",
  };
  let [userData, setUserData] = useState(initlogin);

  function handleChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    if (userData.email === "" || userData.password === "") {
      toast.warn("Enter proper user data!");
      return;
    }
    dispatch(fetchLoginAuth(userData));
    setUserData(initlogin);
  };

  useEffect(() => {
    if (message && success) {
      toast.success(message || "Login successfully!");
      let redirectPath = localStorage.getItem("redirectUrl")
        ? JSON.parse(localStorage.getItem("redirectUrl"))
        : "/";

      localStorage.removeItem("redirectUrl");
      navigate(redirectPath, { replace: true });

      dispatch(reset());
    } else {
      toast.error(message);

      dispatch(reset());
    }
  }, [message, success, error, navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Section - Form */}
        <form
          className="w-1/2 p-8 flex flex-col justify-center"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold text-gray-800">SIGN IN</h1>
          <p className="text-gray-600 text-sm mt-2">
            Welcome back! Please enter your credentials to log in.
          </p>

          <div className="mt-6">
            <label className="block text-gray-700 text-sm font-medium">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300">
            SIGN IN
          </button>

          <div className="mt-4 flex items-center justify-center text-sm">
            <p className="text-gray-600">Not a member?</p>
            <NavLink
              className="ml-2 text-blue-500 hover:underline"
              to={"/signup"}
            >
              Sign Up
            </NavLink>
          </div>
        </form>

        {/* Right Section - Image */}
        <div className="w-1/2">
          <img
            src={Authimg}
            alt="Auth"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
