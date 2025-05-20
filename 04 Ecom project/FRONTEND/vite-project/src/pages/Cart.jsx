import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { useFetchCart } from "../Redux/cartSlice";
import CartItems from "../components/pageItem/CartItems";
import { useFetchData } from "../context/FetchData";
import { useAuth } from "../Redux/authSlice";
import { toast } from "react-toastify";

function Cart() {
  const ref = useRef(null);
  let cartItems = useFetchCart();
  let { loginUser } = useAuth();
  let { showCartDetails } = useFetchData();

  let [text,setText]=useState("")
  let [couponApplied,setCouponApplied]=useState(false)

  
  const cartSubtotal =
    cartItems?.length > 0
      ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      : 0;

  let delivery = 0;

  cartItems?.length > 0 ? !couponApplied ? (delivery = 12) :0 : 0;

  useEffect(() => {
    showCartDetails(cartSubtotal, cartItems?.length, delivery);
  }, [cartItems,delivery]);


  function checkRef() {
    navigator.clipboard.writeText(ref.current.innerText)
    if ( cartItems?.length > 0) {
      
      setText(ref.current.innerText)
    }
  }
  
  function appliedCoupon(){
    
    if (text.toLocaleUpperCase().trim()==="DELIVERY") {
      
      toast.success(`Coupon Applied !!`);
      setCouponApplied(true)
    }else{
      
      toast.warning(`${text}, Invalid Coupon `);
    }

  }

  function removeCoupon(){
    toast.success(`Removed Coupon !!`);
    setCouponApplied(false)
    setText("")
  }


  return (
    <div className="min-h-screen bg-gray-100 py-10 relative">
      <Link
        to={-1}
        className="absolute top-4 left-4 tooltip text-white rounded-full p-2 bg-gray-700 hover:bg-black transition duration-300"
        data-tip="Back"
      >
        ←
      </Link>
      <div className="container mx-auto flex flex-col md:flex-row gap-8 p-6 relative">
        <section className="cart w-full md:w-2/3 bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Shopping Bag
          </h2>
          <p className="text-gray-700 mb-4">
            <span className="text-xl font-semibold text-teal-600">
              {cartItems?.length} Items
            </span>{" "}
            in your bag.
          </p>

          <ul className="flex justify-between border-b pb-2 mb-4 text-gray-600 font-semibold">
            <li className="w-1/4">Product</li>
            <li className="w-1/4">Price</li>
            <li className="w-1/4">Quantity</li>
            <li className="w-1/4">Total</li>
          </ul>

          {cartItems?.length > 0 ? (
            <div className="space-y-6">
              {cartItems.map((cart) => (
                <CartItems cart={cart} key={cart.id} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-32">
              <h2 className="text-gray-500 text-lg">
                No Items Found in the Cart
              </h2>
            </div>
          )}
        </section>

        <section className="payment w-full md:w-1/3 bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Coupon Code
            </h2>
            <p className="text-gray-600 mb-4">
              Apply a coupon <span onClick={checkRef}  ref={ref} className="text-orange-400 font-bold line-through borde-2 bg-teal-800 border-gray-500 h-6 text-center w-20 inline-block cursor-pointer hover:no-underline ">DELIVERY</span> to get  free delivery.
            </p>
            

              <input
              type="text"
              className="border p-2 w-full rounded-md"
              placeholder="Enter Coupon Code"
              disabled ={cartItems?.length == 0}
value={text}
              onChange={(e)=>setText(e.target.value)}
              />
            
            

            {cartItems?.length > 0 ? (
              <>
             {
            couponApplied &&  couponApplied ? 
              
              <button className="w-full bg-orange-900 text-white px-4 py-2 mt-2 rounded-md hover:bg-orange-700" onClick={removeCoupon}>
             REMOVE COUPON
              </button>
              :
              <button className="w-full bg-teal-900 text-white px-4 py-2 mt-2 rounded-md hover:bg-teal-700" onClick={appliedCoupon}>
                APPLY COUPON
                </button>
              
            }
            </>
                
            ) : (
              <button
                className="w-full bg-gray-300 text-white px-4 py-2 mt-2 rounded-md "
                disabled
              >
                APPLY
              </button>
            )}
          </div>

          <div className="text-gray-800">
            <h2 className="text-xl font-semibold mb-4">Cart Total</h2>
            <p className="flex justify-between mb-2">
              Cart Subtotal{" "}
              <span className="font-medium">${cartSubtotal.toFixed(2)}</span>
            </p>
            <p className="flex justify-between mb-2">
              {/* Delivery Charges{" "} */}
              <span className={`font-medium ${couponApplied ?"line-through":"no-underline"} `}> Delivery Charges</span>
              <span className={`font-medium ${couponApplied ?"line-through":"no-underline"} `}>${delivery.toFixed(2)}</span>
            </p>
            <p className="flex justify-between mb-4 font-semibold text-lg">
              Grand Total <span>${(cartSubtotal + delivery).toFixed(2)}</span>
            </p>

            {cartItems?.length > 0 ? (
              <NavLink
                to={"/payment"}
                state={{ user: loginUser, amount: cartSubtotal }}
              >
                <div className="w-full disabled text-center bg-teal-900 text-white px-4 py-2 rounded-md hover:bg-teal-700">
                  CHECKOUT
                </div>
              </NavLink>
            ) : (
              <button
                className="w-full disabled text-center bg-gray-300 text-white px-4 py-2 rounded-md "
                disabled
              >
                CHECKOUT
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Cart;
