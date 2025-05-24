import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { clearCart } from "../Redux/cartSlice";
import { useDispatch } from "react-redux";

function Payment() {
const dispatch=useDispatch()
 
  const location = useLocation();
  const navigate = useNavigate();

  const { user: { name } = { name: "USER" }, amount = 0 } = location.state || {};

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, [location, navigate]);

  function handlePayment() {
    dispatch(clearCart())
    toast.success("PAYMENT SUCCESSFUL");
    window.location.reload();

    navigate("/");
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <p className="text-lg font-semibold mb-4">Hello, <span className="text-teal-700">{name}</span>. <span  className="text-orange-700">${amount.toFixed(2)} </span> have to pay.</p>

      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Payment Details</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 mt-1 border rounded-md bg-gray-100 cursor-not-allowed"
            value={name}
            disabled
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Amount</label>
          <input
            type="text"
            className="w-full px-4 py-2 mt-1 border rounded-md bg-gray-100 cursor-not-allowed"
            value={Math.floor(amount)}
            disabled
          />
        </div>

        <button
          onClick={handlePayment}
          disabled={amount === 0}
          className={`w-full py-2 rounded-md ${
            amount === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-teal-600 text-white hover:bg-teal-900"
          }`}
        >
          Pay now
        </button>
      </div>
    </div>
  );
}

export default Payment;
