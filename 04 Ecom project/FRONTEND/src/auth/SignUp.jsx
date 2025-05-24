import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import AuthRegimg from "../../src/assets/img/auth-reg.jpg";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signUp } from "../Redux/authSlice";

function SignUp() {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let [check, setCheck] = useState(false);

  let initregister = {
    name: "",
    email: "",
    password: "",
  };
  let [userData, setUserData] = useState(initregister);

  function handleChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!check) {
      toast.warn("Checkbox should clicked");
      return;
    }
    if (
      userData.name === "" ||
      userData.email === "" ||
      userData.password === ""
    ) {
      toast.warn("enter proper user data !");
    }
    let getAuth = JSON.parse(localStorage.getItem("authRegister")) || [];

    let userExists = getAuth.some((auth) => auth.email === userData.email);

    if (userExists) {
      toast.error("User already registered!");
      return;
    }

    toast.success("User registered successfully!");

    dispatch(signUp(userData));

    navigate("/login");

    setUserData(initregister);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <form
          className="w-1/2 p-8 flex flex-col justify-center "
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold text-gray-800">SIGN UP</h1>
          <p className="text-gray-600 text-sm mt-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>

          <div className="mt-6">
            <label className="block text-gray-700 text-sm font-medium">
              User Name
            </label>
            <input
              value={userData.name}
              name="name"
              type="text"
              placeholder="Enter User Name"
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mt-4">
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
              placeholder="Enter Password"
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
              onClick={() => setCheck(!check)}
            />
            <span className="ml-2 text-sm text-gray-600">
              I agree to the Terms of Service
            </span>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Create Account
          </button>

          <div className="mt-4 flex items-center justify-center text-sm">
            <p className="text-gray-600">Already a member?</p>
            <NavLink
              className="ml-2 text-blue-500 hover:underline"
              to={"/login"}
            >
              Sign In
            </NavLink>
          </div>
        </form>

        {/* Right Section - Placeholder for Image */}
        <div className="w-1/2 bg-gray-200 flex items-center justify-center">
          <img
            src={AuthRegimg}
            alt="Auth"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
