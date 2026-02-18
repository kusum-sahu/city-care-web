import React, { useState } from "react";
import { FaTimes, FaTrashAlt, FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({ isOpen, onClose }) => {
   const [qty1, setQty1] = useState(1);
  const [qty2, setQty2] = useState(1);

   const navigate = useNavigate();

  const decrease = (qty, setQty) => {
    if (qty > 0) setQty(qty - 1);
  };

  const increase = (qty, setQty) => {
    setQty(qty + 1);
  };
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[40%] bg-white z-50 shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 bg-[#1d5b3f]">
          <h5 className="text-white text-lg font-semibold">My Cart</h5>
          <button onClick={onClose} className="text-white">
            <FaTimes size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 overflow-y-auto h-[calc(100%-70px)]">

          {/* CART ITEM 1 */}
          <div className="flex bg-[#f7f7f7] border border-gray-300 rounded-md p-3 mb-4">
            <div className="w-[90px] mr-4">
              <div className="border border-gray-300 bg-white rounded-md p-2 flex justify-center">
                <img
                  src="/images/service-item/switch-1.png"
                  alt=""
                  className="h-[60px]"
                />
              </div>
            </div>

            <div className="flex-1">
              <h5 className="font-semibold text-sm">
                Switchbox installation (15+ amp)
              </h5>

              <p className="text-sm mt-1">
                <FaRupeeSign className="inline text-xs" />{" "}
                <strong>239</strong>{" "}
                <span className="text-gray-500 text-xs">
                  (Response With in 35 mins)
                </span>
              </p>

              {/* Counter */}
              <div className="mt-2">
                <div className="flex items-center border border-green-400 rounded-md w-fit overflow-hidden">
                  <button
                    onClick={() => decrease(qty1, setQty1)}
                    disabled={qty1 === 0}
                    className="px-2 text-green-600 bg-[#cfffe9] disabled:opacity-40"
                  >
                    −
                  </button>

                  <span className="px-2 text-sm font-semibold bg-green-50">
                    {qty1}
                  </span>

                  <button
                    onClick={() => increase(qty1, setQty1)}
                    className="px-2 text-green-600 bg-[#cfffe9]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button className="bg-red-600 text-white text-xs px-3 py-1 rounded flex items-center gap-1">
                <FaTrashAlt /> Remove
              </button>
            </div>
          </div>

          {/* CART ITEM 2 */}
       <div className="flex bg-[#f7f7f7] border border-gray-300 rounded-md p-3 mb-6">
            <div className="w-[90px] mr-4">
              <div className="border border-gray-300 bg-white rounded-md p-2 flex justify-center">
                <img
                  src="/images/service-item/switch-1.png"
                  alt=""
                  className="h-[60px]"
                />
              </div>
            </div>

            <div className="flex-1">
              <h5 className="font-semibold text-sm">
                Switchbox installation (18+ amp)
              </h5>

              <p className="text-sm mt-1">
                <FaRupeeSign className="inline text-xs" />{" "}
                <strong>239</strong>{" "}
                <span className="text-gray-500 text-xs">
                  (Response With in 35 mins)
                </span>
              </p>

              {/* Counter */}
              <div className="mt-2">
                <div className="flex items-center border border-green-400 rounded-md w-fit overflow-hidden">
                  <button
                    onClick={() => decrease(qty2, setQty2)}
                    disabled={qty2 === 0}
                    className="px-2 text-green-600 bg-[#cfffe9] disabled:opacity-40"
                  >
                    −
                  </button>

                  <span className="px-2 text-sm font-semibold bg-green-50">
                    {qty2}
                  </span>

                  <button
                    onClick={() => increase(qty2, setQty2)}
                    className="px-2 text-green-600 bg-[#cfffe9]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button className="bg-red-600 text-white text-xs px-3 py-1 rounded flex items-center gap-1">
                <FaTrashAlt /> Remove
              </button>
            </div>
          </div>

          {/* PRICE DETAILS */}
          <div className="border border-gray-300 rounded-xl p-4 mt-6 w-[60%]">
            <div className="bg-[#e2fff2] px-4 py-2 rounded-md mb-4">
              <h6 className="font-semibold text-gray-800">
                Price Details
              </h6>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <p className="text-gray-600">
                  Switchbox installation <br />
                  <span className="text-xs">
                    (15+ amp) (Total Item 2)
                  </span>
                </p>
                <p className="font-semibold">₹239</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-600">
                  Switchbox installation <br />
                  <span className="text-xs">
                    (Total Item 1)
                  </span>
                </p>
                <p className="font-semibold">₹139</p>
              </div>
            </div>

            <hr className="my-4 border-dashed" />

            <div className="flex justify-between items-center">
              <h5 className="font-bold text-lg">
                Total Amount
              </h5>
              <h5 className="font-bold text-lg">
                ₹378
              </h5>
            </div>
          </div>

          {/* PLACE ORDER */}
          <div className="mt-6">
            <button onClick={() => navigate("/booking/confirm")} className="bg-[#3bb77e] text-white px-4 py-0.5 rounded-md text-lg">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
