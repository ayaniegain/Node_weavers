import React from "react";
import { useDispatch } from "react-redux";
import { decQty, deleteCart, incQty } from "../../Redux/cartSlice";
import { toast } from "react-toastify";

function CartItems({ cart }) {
  const dispatch=useDispatch()

  const { title, images, quantity, price,id } = cart;
  const totalPrice = price * quantity;


  const deleteItemFunc = (id) => {
    toast.warn("item deleted !");
    dispatch(deleteCart(id));
  };

  return (
    <ul className="flex w-full justify-between items-center border-b pb-2 mb-2">
      <li className="w-1/4 flex items-center">
        <div className="flex items-center space-x-4">
          <img
            src={images}
            alt={title}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <p className="text-sm font-semibold text-teal-800">
            {title.slice(0, 15)}...
          </p>
        </div>
      </li>

      <li className="w-1/4 text-teal-800 font-medium">{`$${
        price?.toFixed(2) || "0.00"
      }`}</li>

      <li className="w-1/4 flex items-center justify-center space-x-3">
        <button onClick={()=>dispatch(decQty(id))} className="px-3 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-900">
          -
        </button>
        <span className="text-teal-800 font-medium">{quantity}</span>
        <button onClick={()=>dispatch(incQty(id))} className="px-3 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-900">
          +
        </button>
      </li>

      <li className="w-1/4 text-teal-800 font-medium">{`$${totalPrice.toFixed(
        2
      )}`}</li>

      <button onClick={()=>deleteItemFunc(id)} className="text-red-500 text-xl hover:text-red-700">🗑</button>
    </ul>
  );
}

export default CartItems;
