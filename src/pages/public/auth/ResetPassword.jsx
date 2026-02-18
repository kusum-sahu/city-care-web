import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-6xl h-[600px] bg-white rounded-xl shadow-xl overflow-hidden flex">
        <div
          className="hidden md:flex w-1/2 text-white p-10 flex-col justify-between"
          style={{
            background:
              "linear-gradient(rgba(59,183,126,0.85), rgba(59,183,126,0.85)), url('/images/login-bg.jpg') center/cover",
          }}
        >
          <img
            src="/images/logo.png"
            alt="CityCare"
            className="w-40"
          />

          <div>
            <h2 className="text-3xl font-bold mb-2">Almost there.</h2>
            <p className="text-sm opacity-90">
              Create a new password to secure your account.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 bg-[#1f2428] text-white p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-2">
            Reset Password
          </h2>

          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            Please enter your new password and confirm it below.
          </p>
          <div className="mb-4">
            <label className="text-sm mb-1 block">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-2 rounded-md bg-[#2a2f33] border border-gray-600 focus:outline-none focus:border-[#3bb77e]"
            />
          </div>
          <div className="mb-5">
            <label className="text-sm mb-1 block">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-4 py-2 rounded-md bg-[#2a2f33] border border-gray-600 focus:outline-none focus:border-[#3bb77e]"
            />
          </div>
          <button className="w-full bg-[#3bb77e] hover:bg-[#34a56f] transition text-white py-2 rounded-md text-lg font-medium mb-6">
            Reset Password
          </button>

          <div className="flex items-center text-gray-400 text-sm mb-5">
            <div className="flex-1 h-px bg-gray-600" />
            <span className="px-3">Or with Social Profile</span>
            <div className="flex-1 h-px bg-gray-600" />
          </div>

          <div className="flex justify-center gap-5 mb-6">
            <FaFacebookF className="cursor-pointer hover:text-[#3bb77e]" />
            <FaTwitter className="cursor-pointer hover:text-[#3bb77e]" />
            <FaInstagram className="cursor-pointer hover:text-[#3bb77e]" />
            <FaYoutube className="cursor-pointer hover:text-[#3bb77e]" />
          </div>

          <p className="text-center text-sm">
            Back to{" "}
            <span onClick={() => navigate("/login")} className="text-[#3bb77e] cursor-pointer hover:underline">
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
