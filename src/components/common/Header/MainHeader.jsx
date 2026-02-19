import { useState } from "react";
import {
  FaUser,
  FaShoppingCart,
  FaUserCircle,
  FaChevronDown,
  FaConciergeBell,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CartDrawer from "./CartDrawer";

const MainHeader = () => {
  const [openCart, setOpenCart] = useState(false);
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setShowLogoutModal(false);
    navigate("/login");
  };

  return (
    <>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/public/images/citycare.png"
              alt="CityCare"
              className="h-12"
            />
            <div className="leading-tight">
              <h1 className="text-green-700 font-bold text-lg">
                CITYCARE
              </h1>
              <p className="text-xs text-gray-600">
                SERVICE CENTER
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {!localStorage.getItem("token") ? (
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 bg-[#023a20] text-white px-4 py-1 rounded-md text-sm hover:bg-[#145A41] transition"
              >
                <FaUser /> Login
              </button>
            ) : null}
            <div className="relative group">
              <div className="flex items-center gap-2 border border-[#023a20] rounded-lg px-3 py-1.5 cursor-pointer">
                <FaUserCircle className="text-[#023a20] text-xl" />
                <span className="text-gray-700 font-bold text-sm">
                  Priyabrata
                </span>
                <FaChevronDown className="text-xs text-[#023a20]" />
              </div>

              <ul className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">

                <li>
                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full text-left flex items-center gap-2 px-4 py-1 text-sm hover:bg-[#3bb77e]"
                  >
                    <FaUser /> My Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/profile/services")}
                    className="w-full text-left flex items-center gap-2 px-4 py-1 text-sm hover:bg-[#3bb77e]"
                  >
                    <FaConciergeBell /> My Services
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => setOpenCart(true)}
                    className="w-full text-left flex items-center gap-2 px-4 py-1 text-sm hover:bg-[#3bb77e]"
                  >
                    <FaShoppingCart /> Cart
                  </button>
                </li>

                <li>
                  <button onClick={() => setShowLogoutModal(true)} className="flex items-center gap-2 px-4 py-1 text-sm  hover:bg-red-500 w-full text-left">
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setOpenCart(true)}
              className="relative text-[#023a20] text-xl"
            >
              <FaShoppingCart />
              <span className="absolute -top-2 -right-2 bg-[#023a20] text-white text-xs px-2 rounded-full">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
      <CartDrawer
        isOpen={openCart}
        onClose={() => setOpenCart(false)}
      />
      
      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

          <div className="bg-white rounded-lg shadow-lg w-80 p-6 relative">

            <button
              onClick={() => setShowLogoutModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <FaTimes />
            </button>

            <h2 className="text-lg font-semibold mb-4 text-center">
              Are you sure you want to logout?
            </h2>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes
              </button>

              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default MainHeader;
