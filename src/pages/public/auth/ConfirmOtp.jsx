// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const ConfirmOtp = () => {
//   const [otp, setOtp] = useState(["", "", "", ""]);
//   const navigate = useNavigate();

//   const handleChange = (value, index) => {
//     if (!/^[0-9]?$/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 3) {
//       document.getElementById(`otp-${index + 1}`).focus();
//     }
//   };

//   const handleSubmit = () => {
//     const enteredOtp = otp.join("");
//     if (enteredOtp.length === 4) {
//       navigate("/reset-password"); // next step
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-2">

//         {/* LEFT IMAGE SECTION */}
//         <div
//           className="relative hidden md:flex items-center justify-center"
//           style={{
//             backgroundImage: "url('/images/otp-bg.jpg')",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           <div className="absolute inset-0 bg-green-600/80"></div>

//           <div className="relative text-white px-10">
//             <h2 className="text-3xl font-bold mb-4">Don't worry,</h2>
//             <p className="text-sm">
//               We are here to help you recover your password.
//             </p>
//           </div>
//         </div>

//         {/* RIGHT OTP FORM */}
//         <div className="bg-[#1f2428] text-white px-10 py-12 flex flex-col justify-center">
//           <h2 className="text-2xl font-semibold mb-2 text-center">
//             Confirm OTP
//           </h2>

//           <p className="text-sm text-gray-400 text-center mb-8">
//             Enter the OTP sent to your email or mobile number
//           </p>

//           {/* OTP INPUTS */}
//           <div className="flex justify-center gap-4 mb-8">
//             {otp.map((digit, i) => (
//               <input
//                 key={i}
//                 id={`otp-${i}`}
//                 type="text"
//                 maxLength="1"
//                 value={digit}
//                 onChange={(e) => handleChange(e.target.value, i)}
//                 className="w-14 h-14 text-center text-xl rounded-md bg-transparent border border-gray-500 focus:border-green-500 outline-none"
//               />
//             ))}
//           </div>

//           {/* BUTTON */}
//           <button
//             onClick={handleSubmit}
//             className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md font-medium transition"
//           >
//             Continue
//           </button>

//           {/* BACK */}
//           <p
//             onClick={() => navigate("/login")}
//             className="text-center text-sm text-gray-400 mt-6 cursor-pointer hover:text-white"
//           >
//             Return to Sign In
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConfirmOtp;


import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ConfirmOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-6xl h-[600px] bg-white rounded-xl shadow-xl overflow-hidden flex">

        {/* LEFT SECTION */}
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
            <h2 className="text-3xl font-bold mb-2">Don't worry.</h2>
            <p className="text-sm opacity-90">
              We are here help you to recover your password.
            </p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full md:w-1/2 bg-[#1f2428] text-white p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-2">
            Confirm OTP
          </h2>

          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            Enter the OTP sent to your email or mobile number.
          </p>

          {/* OTP INPUTS */}
          <div className="flex gap-4 mb-6">
            {otp.map((digit, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                className="w-14 h-14 text-center text-xl rounded-md bg-[#2a2f33] border border-gray-600 focus:outline-none focus:border-[#3bb77e]"
              />
            ))}
          </div>

          {/* BUTTON */}
          <button
            onClick={() => navigate("/reset-password")}
            className="w-full bg-[#3bb77e] hover:bg-[#34a56f] transition text-white py-2 rounded-md text-lg font-medium mb-6"
          >
            Continue
          </button>

          {/* DIVIDER */}
          <div className="flex items-center text-gray-400 text-sm mb-5">
            <div className="flex-1 h-px bg-gray-600" />
            <span className="px-3">Or with Social Profile</span>
            <div className="flex-1 h-px bg-gray-600" />
          </div>

          {/* SOCIAL */}
          <div className="flex justify-center gap-5 mb-6">
            <FaFacebookF className="cursor-pointer hover:text-[#3bb77e]" />
            <FaTwitter className="cursor-pointer hover:text-[#3bb77e]" />
            <FaInstagram className="cursor-pointer hover:text-[#3bb77e]" />
            <FaYoutube className="cursor-pointer hover:text-[#3bb77e]" />
          </div>

          {/* BACK */}
          <p
            onClick={() => navigate("/login")}
            className="text-center text-sm cursor-pointer"
          >
            Return to{" "}
            <span className="text-[#3bb77e] hover:underline">
              Sign In
            </span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default ConfirmOtp;
